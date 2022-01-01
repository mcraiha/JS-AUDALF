import { AUDALF_Definitions as Definitions, SerializationSettings } from "./AUDALF_Definitions.ts";

class ByteWriter
{
    byteArray: Uint8Array;
    curPos: number;

    constructor(byteArrayToUse: Uint8Array, startPosition: number = 0)
    {
        this.byteArray = byteArrayToUse;
        this.curPos = startPosition;
    }

    public WriteByte(byte: number): void
    {
        const increasePos = 1;
        new DataView(this.byteArray.buffer).setUint8(this.curPos, byte);
        this.curPos += increasePos;
    }

    public WriteByteArray(uint8ArrayToWrite: Uint8Array): void
    {
        const increasePos = uint8ArrayToWrite.length;
        this.byteArray.set(uint8ArrayToWrite, this.curPos);
        this.curPos += increasePos;
    }

    public WriteNumberAs64BitUnsigned(numberToWrite: number): void
    {
        if (numberToWrite < 0)
        {
            throw new Error('Number must be positive');
        }

        const bigInteger: bigint = BigInt(numberToWrite);
        new DataView(this.byteArray.buffer).setBigUint64(this.curPos, bigInteger, /* littleEndian*/ true);
        this.curPos += 8;
    }

    public WriteZeroBytes(howManyZeroesAreWanted: number): void
    {
        for (let i = 0; i < howManyZeroesAreWanted; i++)
        {
            this.WriteByte(0);
        }
    }

    public WriteBigInt(bigInteger: bigint): void
    {

    }

    public SeekToPosition(newPosition: number): void
    {
        this.curPos = newPosition;
    }
}

/// <summary>
/// Static class for serializing structures to AUDALF bytes
/// </summary>
export class AUDALF_Serialize
{
    private static readonly KeyCannotBeNullError: string = "Key cannot be null!";
	private static readonly ValueCannotBeNullWithoutKnownValueTypeError: string = "You cannot use null value without known value type!";    

    public static Serialize(object: any, serializationSettings: SerializationSettings = new SerializationSettings()): Uint8Array
    {
        if (object instanceof Uint8Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.unsigned_8_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }

        throw new Error('Cannot serialize objectd');
    }

    private static GetHeaderSizeInBytes(): number
    {
        return Definitions.fourCC.length + Definitions.versionNumber.length + Definitions.payloadSizePlaceholder.length;
    }

    private static CalculateIndexSectionSizeInBytes(indexCount: number): number
    {
        // Index count takes 8 bytes, key type takes 8 bytes, and every index needs 8 bytes
        return 8 + 8 + (indexCount * 8);
    }

    private static CalculateNeededListBytes(values: any[], originalType: Uint8Array | null): number
    {
        if (originalType != null)
        {
            // List index + value type + actual value in bytes
            return values.length * (8 + 8 + Definitions.GetByteLengthWithAUDALFtype(originalType.toString()));
        }

        let total: number = 0;

        // TODO: Implement this
        /*for (let i = 0; i < positions.length; i++)
        {

        }*/

        return total;
    }

    private static GenericSerialize(keyValuePairsBytes: Uint8Array, keyValuePairsOffsets: number[], keyTypeAsBytes: Uint8Array): Uint8Array
    {
        const totalFinalSize = AUDALF_Serialize.GetHeaderSizeInBytes() + AUDALF_Serialize.CalculateIndexSectionSizeInBytes(keyValuePairsOffsets.length) + keyValuePairsBytes.length;
        const tempArray: Uint8Array = new Uint8Array(totalFinalSize);

        const writer: ByteWriter = new ByteWriter(tempArray);

        // Write header
        AUDALF_Serialize.WriteHeader(writer);

        // Write index section
        AUDALF_Serialize.WriteIndexSection(writer, keyTypeAsBytes, keyValuePairsOffsets);

        // Write Key and value pairs section
        writer.WriteByteArray(keyValuePairsBytes);

        // Get total length
        const totalLengthInBytes: number = writer.curPos;
        writer.SeekToPosition(Definitions.payloadSizeOffset);
        writer.WriteNumberAs64BitUnsigned(totalLengthInBytes);

        return writer.byteArray;
    }

    private static WriteHeader(writer: ByteWriter): void
    {
        // First write FourCC
        writer.WriteByteArray(Definitions.fourCC);

        // Then version number
        writer.WriteByteArray(Definitions.versionNumber);

        // Then some zeroes for payload size since this will be fixed later
        writer.WriteByteArray(Definitions.payloadSizePlaceholder);
    }

    private static WriteIndexSection(writer: ByteWriter, keyTypeAsBytes: Uint8Array, positions: number[]): void
    {
        const indexCount: number = positions.length;

        const totalByteCountOfHeaderAndIndexSection: number = indexCount * 8 + 16 + 16;

        // Write index count as 8 bytes
        writer.WriteNumberAs64BitUnsigned(indexCount);

        // Write Key type as 8 bytes
        writer.WriteByteArray(keyTypeAsBytes);

        // Write each position separately (index count * 8 bytes)
        for (let i = 0; i < positions.length; i++)
        {
            writer.WriteNumberAs64BitUnsigned(positions[i] + totalByteCountOfHeaderAndIndexSection);
        }
    }

    private static GenerateListKeyValuePairs(values: any[], originalType: Uint8Array, serializationSettings: SerializationSettings): [Uint8Array, number[]]
    {
        const offsets: number[] = new Array(values.length);

        const tempArray: Uint8Array = new Uint8Array(AUDALF_Serialize.CalculateNeededListBytes(values, originalType));

        const writer: ByteWriter = new ByteWriter(tempArray);
        for (let i = 0; i < values.length; i++)
        {
            offsets[i] = writer.curPos;
            AUDALF_Serialize.WriteOneListKeyValuePair(writer, i, values[i], originalType, serializationSettings);
        }

        return [writer.byteArray, offsets];
    }

    private static WriteOneListKeyValuePair(writer: ByteWriter, listIndex: number, value: any, originalType: Uint8Array, serializationSettings: SerializationSettings): void
    {
        // Write list index number which is always 8 bytes
        writer.WriteNumberAs64BitUnsigned(listIndex);

        AUDALF_Serialize.GenericWrite(writer, value, originalType, /*isKey*/ false, serializationSettings);
    }

    private static GenericWrite(writer: ByteWriter, variableToWrite: any, originalType: Uint8Array, isKey: boolean, serializationSettings: SerializationSettings): void
    {
        if (Definitions.ByteArrayCompare(originalType, Definitions.unsigned_8_bit_integerType))
        {
            AUDALF_Serialize.WriteByte(writer, variableToWrite, isKey);
        }
    }

    private static WriteByte(writer: ByteWriter, variableToWrite: any, isKey: boolean): void
    {
        // Single byte takes either 8 bytes (as key since type ID is given earlier) or 16 bytes (as value since type ID must be given)
        if (!isKey)
        {
            // Write value type ID (8 bytes)
            writer.WriteByteArray(Definitions.unsigned_8_bit_integerType);
        }
        
        // Write byte as 1 byte
        writer.WriteByte(variableToWrite);

        // Write 7 bytes of padding
        writer.WriteZeroBytes(7);
    }
}