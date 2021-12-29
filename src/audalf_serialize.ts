import { AUDALF_Definitions as Definitions, SerializationSettings } from "./AUDALF_Definitions.ts";

/// <summary>
/// Static class for serializing structures to AUDALF bytes
/// </summary>
export class AUDALF_Serialize
{
    private static readonly KeyCannotBeNullError: string = "Key cannot be null!";
	private static readonly ValueCannotBeNullWithoutKnownValueTypeError: string = "You cannot use null value without known value type!";

    public static Serialize(object: any): Uint8Array
    {

    }

    private static GetHeaderSizeInBytes(): number
    {
        return Definitions.fourCC.length + Definitions.versionNumber.length + Definitions.payloadSizePlaceholder.length;
    }

    private static WriteHeader(writeArray: Uint8Array, index: number): number
    {
        const indexAtStart: number = index;

        // First write FourCC
        writeArray.set(Definitions.fourCC, index);
        index += Definitions.fourCC.length;

        // Then version number
        writeArray.set(Definitions.versionNumber, index);
        index += Definitions.versionNumber.length;

        // Then some zeroes for payload size since this will be fixed later
        writeArray.set(Definitions.payloadSizePlaceholder, index);
        index += Definitions.payloadSizePlaceholder.length;

        return index - indexAtStart;
    }

    private static WriteOneListKeyValuePair(writeArray: Uint8Array, index: number, value: any, originalType: Uint8Array, serializationSettings: SerializationSettings): number
    {
        // Store current offset, because different types can take different amount of space
        ulong returnValue = (ulong)writer.BaseStream.Position;

        // Write Index number which is always 8 bytes
        writer.Write(index);

        AUDALF_Serialize.GenericWrite(writeArray, index, value, originalType, /*isKey*/ false, serializationSettings);

        return returnValue;
    }

    private static GenericWrite(writeArray: Uint8Array, index: number, variableToWrite: any, originalType: Uint8Array, isKey: boolean, serializationSettings: SerializationSettings): void
    {
        if (Definitions.ByteArrayCompare(originalType, Definitions.unsigned_8_bit_integerType))
        {
            AUDALF_Serialize.WriteByte(writeArray, index, variableToWrite, isKey);
        }
    }

    private static WriteByte(writeArray: Uint8Array, index: number, variableToWrite: any, isKey: boolean): number
    {
        const indexAtStart: number = index;
        // Single byte takes either 8 bytes (as key since type ID is given earlier) or 16 bytes (as value since type ID must be given)
        if (!isKey)
        {
            // Write value type ID (8 bytes)
            writeArray.set(Definitions.unsigned_8_bit_integerType, index);
            index += 8;
        }
        
        // Write byte as 1 byte
        writeArray.set([variableToWrite], index);
        index += 1;

        // Write 7 bytes of padding
        AUDALF_Serialize.PadWithZeros(writeArray, index, 7);
        index += 7;
        
        return index - indexAtStart;
    }

    private static readonly zeroByte: number[] = [0];
    private static PadWithZeros(writeArray: Uint8Array, index: number, howManyZeros: number): void
    {
        for (let i = 0; i < howManyZeros; i++)
        {
            writeArray.set(AUDALF_Serialize.zeroByte, index + i);
        }
    }
}