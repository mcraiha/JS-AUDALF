import { AUDALF_Definitions as Definitions, DeserializationSettings } from "./AUDALF_Definitions.ts";

/// <summary>
/// AUDALF validation result
/// </summary>
enum AUDALF_ValidationResult
{
    /// <summary>
    /// Ok
    /// </summary>
    Ok = 0,
    
    /// <summary>
    /// Wrong FourCC
    /// </summary>
    WrongFourCC,

    /// <summary>
    /// Version number too big
    /// </summary>
    VersionTooBig,

    /// <summary>
    /// Unknown key type
    /// </summary>
    UnknownKeyType,

    /// <summary>
    /// Unknown value type
    /// </summary>
    UnknownValueType
}

/// <summary>
/// Static class for deserializing AUDALF bytes into something more useful
/// </summary>
export class AUDALF_Deserialize
{
    /// <summary>
    /// Deserialize AUDALF bytes to array
    /// </summary>
    /// <param name="payload">AUDALF bytes</param>
    /// <param name="doSafetyChecks">Do safety checks</param>
    /// <typeparam name="T">Type of array variables</typeparam>
    /// <returns>Array of variables</returns>
    public static Deserialize(payload: Uint8Array, doSafetyChecks: boolean = true): any
    {
        
    }

    public static IsAUDALF(payload: Uint8Array): boolean
    {
        return Definitions.ByteArrayCompare(Definitions.fourCC, payload.slice(0, 4));
    }

    public static GetVersionNumber(payload: Uint8Array): number
    {
        return new DataView(payload.buffer, Definitions.versionOffset, 4).getUint32(0);
    }

    public static GetByteSize(payload: Uint8Array): bigint
    {
        return new DataView(payload.buffer, Definitions.payloadSizeOffset, 8).getBigUint64(0);
    }

    public static IsDictionary(payload: Uint8Array): boolean
    {
        const keyType: Uint8Array = payload.slice(Definitions.keyTypeOffset, 8);
        return !Definitions.ByteArrayCompare(Definitions.specialType, keyType);
    }

    public static ReadKeyType(payload: Uint8Array): Uint8Array
    {
        return payload.slice(Definitions.keyTypeOffset, 8);
    }

    public static ParseKeyType(payload: Uint8Array): string
    {
        return Definitions.GetTypescriptTypeWithAUDALFtype(AUDALF_Deserialize.ReadKeyType(payload).toString());
    }

    public static GetIndexCount(payload: Uint8Array): bigint
    {
        return new DataView(payload.buffer, Definitions.indexCountOffset, 8).getBigUint64(0);
    }

    public static GetEntryDefinitionOffsets(payload: Uint8Array): bigint[]
    {
        const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(payload);
        let returnValues: bigint[] = new Array(Number(indexCount));
        for (let i = 0n; i < indexCount; i++)
        {
            const offset: number = Definitions.entryDefinitionsOffset + Number(i) * 8;
            returnValues.push(new DataView(payload.buffer, offset, 8).getBigUint64(0))
        }

        return returnValues;
    }

    public static ReadListKeyAndValueFromOffset(payload: Uint8Array, offset: bigint, wantedType: string): [bigint, any] 
    {
        const numberOffset = Number(offset);
        const keyIndex: bigint = new DataView(payload.buffer, numberOffset, 8).getBigUint64(0);

        const typeIdAsBytes: Uint8Array = payload.slice(numberOffset + 8, 8);

        const readValue = this.Read(payload, offset + 16n, typeIdAsBytes, wantedType)

        return [keyIndex, readValue];
    }

    private static Read(payload: Uint8Array, offset: bigint, typeIdAsBytes: Uint8Array, wantedType: string, settings?:DeserializationSettings): any
		{
            const numberOffset = Number(offset);
			if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_8_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 1).getUint8(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_8_bit_integerArrayType))
			{
				const byteArrayLengthInBytes: bigint = new DataView(payload.buffer, numberOffset, 8).getBigUint64(0);
                return payload.slice(numberOffset + 8, Number(byteArrayLengthInBytes));
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_16_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 2).getUint16(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_32_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 4).getUint32(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_64_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 8).getBigUint64(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_16_bit_integerArrayType))
			{
				/*ulong byteArrayLengthInBytes = reader.ReadUInt64();
				byte[] bytes = reader.ReadBytes((int)byteArrayLengthInBytes);
				ushort[] returnArray = new ushort[byteArrayLengthInBytes / 2];
				Buffer.BlockCopy(bytes, 0, returnArray, 0, (int)byteArrayLengthInBytes);
				return returnArray;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_32_bit_integerArrayType))
			{
				/*ulong byteArrayLengthInBytes = reader.ReadUInt64();
				byte[] bytes = reader.ReadBytes((int)byteArrayLengthInBytes);
				uint[] returnArray = new uint[byteArrayLengthInBytes / 4];
				Buffer.BlockCopy(bytes, 0, returnArray, 0, (int)byteArrayLengthInBytes);
				return returnArray;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_8_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 1).getInt8(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_16_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 2).getInt16(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_32_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 4).getInt32(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_32_bit_integerArrayType))
			{
				/*ulong byteArrayLengthInBytes = reader.ReadUInt64();
				byte[] bytes = reader.ReadBytes((int)byteArrayLengthInBytes);
				int[] returnArray = new int[byteArrayLengthInBytes / 4];
				Buffer.BlockCopy(bytes, 0, returnArray, 0, (int)byteArrayLengthInBytes);
				return returnArray;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_64_bit_integerType))
			{
				return new DataView(payload.buffer, numberOffset, 8).getBigInt64(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_64_bit_integerArrayType))
			{
				/*ulong byteArrayLengthInBytes = reader.ReadUInt64();
				byte[] bytes = reader.ReadBytes((int)byteArrayLengthInBytes);
				long[] returnArray = new long[byteArrayLengthInBytes / 8];
				Buffer.BlockCopy(bytes, 0, returnArray, 0, (int)byteArrayLengthInBytes);
				return returnArray;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.floating_point_32_bit))
			{
				return new DataView(payload.buffer, numberOffset, 4).getFloat32(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.floating_point_64_bit))
			{
				return new DataView(payload.buffer, numberOffset, 8).getFloat64(0);
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.string_utf8))
			{
				/*ulong stringLengthInBytes = reader.ReadUInt64();
				return Encoding.UTF8.GetString(reader.ReadBytes((int)stringLengthInBytes));*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.booleans))
			{
				//return reader.ReadBoolean();
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.datetime_unix_seconds))
			{
				/*long timeStamp = reader.ReadInt64();
				DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(timeStamp);

				if (wantedType == typeof(DateTimeOffset) || settings?.wantedDateTimeType == typeof(DateTimeOffset))
				{
					return dateTimeOffset;
				}
				
				return dateTimeOffset.UtcDateTime;// .DateTime;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.datetime_unix_milliseconds))
			{
				/*long timeStamp = reader.ReadInt64();
				DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeMilliseconds(timeStamp);

				if (wantedType == typeof(DateTimeOffset) || settings?.wantedDateTimeType == typeof(DateTimeOffset))
				{
					return dateTimeOffset;
				}

				return dateTimeOffset.UtcDateTime;// .DateTime;*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.datetime_iso_8601))
			{
				/*ulong stringLengthInBytes = reader.ReadUInt64();
				string iso8601 = Encoding.UTF8.GetString(reader.ReadBytes((int)stringLengthInBytes));

				if (wantedType == typeof(DateTimeOffset) || settings?.wantedDateTimeType == typeof(DateTimeOffset))
				{
					return DateTimeOffset.Parse(iso8601, null, DateTimeStyles.RoundtripKind);
				}

				return DateTime.Parse(iso8601, null, DateTimeStyles.RoundtripKind);*/
			}
			else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.bigIntegerType))
			{
				/*ulong bigIntegerLengthInBytes = reader.ReadUInt64();
				byte[] tempBytes = reader.ReadBytes((int)bigIntegerLengthInBytes);
				return new BigInteger(tempBytes);*/
			}

			return null;
		}
}