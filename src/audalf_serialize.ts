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
}

/// <summary>
/// Static class for serializing structures to AUDALF bytes
/// </summary>
export class AUDALF_Serialize
{
    private static readonly KeyCannotBeNullError: string = "Key cannot be null!";
	private static readonly ValueCannotBeNullWithoutKnownValueTypeError: string = "You cannot use null value without known value type!";    

    public static Serialize(object: any, serializationSettings: SerializationSettings): Uint8Array
    {
        if (object instanceof Uint8Array)
        {

        }

        throw new Error('Cannot serialize objectd');
    }

    private static GetHeaderSizeInBytes(): number
    {
        return Definitions.fourCC.length + Definitions.versionNumber.length + Definitions.payloadSizePlaceholder.length;
    }

    private static CalculateNeededListBytes(values: any[]): number
    {
        let total: number = 0;

        return total;
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

    private static GenerateListKeyValuePairs(values: any[], originalType: Uint8Array, serializationSettings: SerializationSettings): [Uint8Array, number[]]
    {
        const offsets: number[] = new Array(values.length);

        const tempArray: Uint8Array = new Uint8Array(AUDALF_Serialize.CalculateNeededListBytes(values));

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