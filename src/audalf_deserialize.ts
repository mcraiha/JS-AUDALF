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
		if (doSafetyChecks)
		{
			if (!AUDALF_Deserialize.IsAUDALF(payload))
			{
				throw new Error('Payload is not in an AUDALF format');
			}
		}

		const entryOffsets: bigint[] = AUDALF_Deserialize.GetEntryDefinitionOffsets(payload);

		if (AUDALF_Deserialize.IsDictionary(payload))
		{
			// Dictionary
			const typeIdOfKeys: Uint8Array = AUDALF_Deserialize.ReadKeyType(payload);
			const returnMap = new Map();
			for (let i = 0; i < entryOffsets.length; i++)
			{
				const keyAndValue: [any, any] = this.ReadDictionaryKeyAndValueFromOffset(payload, entryOffsets[i], typeIdOfKeys, "");
				returnMap.set(keyAndValue[0], keyAndValue[1]);
			}
			return Object.fromEntries(returnMap);
		}
		else
		{
			// Array
			const sameTypes: [boolean, Uint8Array | null] = AUDALF_Deserialize.CheckIfAllListEntryDefinitionsHaveSameValueTypes(payload, entryOffsets);

			if (sameTypes[0])
			{
				if (Definitions.ByteArrayCompare(sameTypes[1]!, Definitions.unsigned_8_bit_integerType))
				{
					const returnValues: Uint8Array = new Uint8Array(entryOffsets.length);
					for (let i = 0; i < returnValues.length; i++)
					{
						const indexAndValue: [bigint, any] = AUDALF_Deserialize.ReadListKeyAndValueFromOffset(payload, entryOffsets[i], "");
						returnValues[Number(indexAndValue[0])] = indexAndValue[1];
					}

					return returnValues;
				}
				else if (Definitions.ByteArrayCompare(sameTypes[1]!, Definitions.unsigned_16_bit_integerType))
				{
					const returnValues: Uint16Array = new Uint16Array(entryOffsets.length);
					for (let i = 0; i < returnValues.length; i++)
					{
						const indexAndValue: [bigint, any] = AUDALF_Deserialize.ReadListKeyAndValueFromOffset(payload, entryOffsets[i], "");
						returnValues[Number(indexAndValue[0])] = indexAndValue[1];
					}

					return returnValues;
				}
				else if (Definitions.ByteArrayCompare(sameTypes[1]!, Definitions.unsigned_32_bit_integerType))
				{
					const returnValues: Uint32Array = new Uint32Array(entryOffsets.length);
					for (let i = 0; i < returnValues.length; i++)
					{
						const indexAndValue: [bigint, any] = AUDALF_Deserialize.ReadListKeyAndValueFromOffset(payload, entryOffsets[i], "");
						returnValues[Number(indexAndValue[0])] = indexAndValue[1];
					}

					return returnValues;
				}
				else if (Definitions.ByteArrayCompare(sameTypes[1]!, Definitions.signed_32_bit_integerType))
				{
					const returnValues: Int32Array = new Int32Array(entryOffsets.length);
					for (let i = 0; i < returnValues.length; i++)
					{
						const indexAndValue: [bigint, any] = AUDALF_Deserialize.ReadListKeyAndValueFromOffset(payload, entryOffsets[i], "");
						returnValues[Number(indexAndValue[0])] = indexAndValue[1];
					}

					return returnValues;
				}
				else if (Definitions.ByteArrayCompare(sameTypes[1]!, Definitions.string_utf8))
				{
					const returnValues: string[] = new Array<string>(entryOffsets.length);
					for (let i = 0; i < returnValues.length; i++)
					{
						const indexAndValue: [bigint, any] = AUDALF_Deserialize.ReadListKeyAndValueFromOffset(payload, entryOffsets[i], "");
						returnValues[Number(indexAndValue[0])] = indexAndValue[1];
					}

					return returnValues;
				}
			}
		}

		throw new Error('Cannot deserialize payload');
	}

	public static IsAUDALF(payload: Uint8Array): boolean
	{
		return Definitions.ByteArrayCompare(Definitions.fourCC, payload.slice(0, 4));
	}

	public static GetVersionNumber(payload: Uint8Array): number
	{
		return new DataView(payload.buffer, Definitions.versionOffset, 4).getUint32(0, /* littleEndian */ true);
	}

	public static GetByteSize(payload: Uint8Array): bigint
	{
		return new DataView(payload.buffer, Definitions.payloadSizeOffset, 8).getBigUint64(0, /* littleEndian */ true);
	}

	public static IsDictionary(payload: Uint8Array): boolean
	{
		const keyType: Uint8Array = payload.slice(Definitions.keyTypeOffset, Definitions.keyTypeOffset + 8);
		return !Definitions.ByteArrayCompare(Definitions.specialType, keyType);
	}

	public static ReadKeyType(payload: Uint8Array): Uint8Array
	{
		return payload.slice(Definitions.keyTypeOffset, Definitions.keyTypeOffset + 8);
	}

	public static ParseKeyType(payload: Uint8Array): string
	{
		return Definitions.GetTypescriptTypeWithAUDALFtype(AUDALF_Deserialize.ReadKeyType(payload).toString());
	}

	public static GetIndexCount(payload: Uint8Array): bigint
	{
		return new DataView(payload.buffer, Definitions.indexCountOffset, 8).getBigUint64(0, /* littleEndian */ true);
	}

	public static GetEntryDefinitionOffsets(payload: Uint8Array): bigint[]
	{
		const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(payload);
		let returnValues: bigint[] = new Array(Number(indexCount));
		for (let i = 0n; i < indexCount; i++)
		{
			const numberIndex: number = Number(i);
			const offset: number = Definitions.entryDefinitionsOffset + numberIndex * 8;
			returnValues[numberIndex] = new DataView(payload.buffer, offset, 8).getBigUint64(0, /* littleEndian */ true);
		}

		return returnValues;
	}

	public static CheckIfAllListEntryDefinitionsHaveSameValueTypes(payload: Uint8Array, offsets: bigint[]): [boolean, Uint8Array | null]
	{
		let lastType: Uint8Array | null = null;
		for (let i = 0; i < offsets.length; i++)
		{
			const numberOffset = Number(offsets[i]);
			const typeIdAsBytesOffset: number = numberOffset + 8;
			let typeIdAsBytes: Uint8Array = payload.slice(typeIdAsBytesOffset, typeIdAsBytesOffset + 8);

			// Special case for NULL since order is different in that case
			//console.log(typeIdAsBytes);
			if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.specialType))
			{
				//console.log("SPECIAL CASE!");
				typeIdAsBytes = payload.slice(typeIdAsBytesOffset + 8, typeIdAsBytesOffset + 16);
			}

			if (lastType != null && !Definitions.ByteArrayCompare(typeIdAsBytes, lastType))
			{
				console.log(typeIdAsBytes);
				console.log(" vs ");
				console.log(lastType);
				return [false, null];
			}

			lastType = typeIdAsBytes;
		}

		return [true, lastType];
	}

	public static CheckIfAllDictionaryEntryDefinitionsHaveSameValueTypes(payload: Uint8Array, offsets: bigint[], typeIdOfKeys: Uint8Array): [boolean, Uint8Array | null]
	{
		let lastType: Uint8Array | null = null;
		for (let i = 0; i < offsets.length; i++)
		{
			const numberOffset = Number(offsets[i]);

			// Figure how much space key needs

			const typeIdAsBytesOffset: number = numberOffset + 8;
			let typeIdAsBytes: Uint8Array = payload.slice(typeIdAsBytesOffset, typeIdAsBytesOffset + 8);

			// Special case for NULL since order is different in that case
			//console.log(typeIdAsBytes);
			if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.specialType))
			{
				//console.log("SPECIAL CASE!");
				typeIdAsBytes = payload.slice(typeIdAsBytesOffset + 8, typeIdAsBytesOffset + 16);
			}

			if (lastType != null && !Definitions.ByteArrayCompare(typeIdAsBytes, lastType))
			{
				console.log(typeIdAsBytes);
				console.log(" vs ");
				console.log(lastType);
				return [false, null];
			}

			lastType = typeIdAsBytes;
		}

		return [true, lastType];
	}

	public static ReadListKeyAndValueFromOffset(payload: Uint8Array, offset: bigint, wantedType: string): [bigint, any] 
	{
		const numberOffset = Number(offset);
		const keyIndex: bigint = new DataView(payload.buffer, numberOffset, 8).getBigUint64(0, /* littleEndian */ true);

		const typeIdAsBytesOffset: number = numberOffset + 8;
		const typeIdAsBytes: Uint8Array = payload.slice(typeIdAsBytesOffset, typeIdAsBytesOffset + 8);

		const readValue = this.Read(payload, offset + 16n, typeIdAsBytes, wantedType)

		return [keyIndex, readValue];
	}

	public static ReadDictionaryKeyAndValueFromOffset(payload: Uint8Array, offset: bigint, typeIdOfKeys: Uint8Array, wantedType: string): [any, any] 
	{
		const key = this.Read(payload, offset, typeIdOfKeys, wantedType);
		const offsetAdvance: number = Definitions.NextDivisableBy8(this.CalculateNeededReadOffsetAdvance(payload, offset, typeIdOfKeys));

		const typeIdAsBytesOffset: number = Number(offset) + offsetAdvance;
		const typeIdAsBytes: Uint8Array = payload.slice(typeIdAsBytesOffset, typeIdAsBytesOffset + 8);

		const readValue = this.Read(payload, BigInt(typeIdAsBytesOffset + 8), typeIdAsBytes, wantedType);

		return [key, readValue];
	}

	private static readonly dynamicLengthDeserializationCalculator: Map<string, (payload: Uint8Array, offset: bigint) => number> = new Map<string, (payload: Uint8Array, offset: bigint) => number>([
        [Definitions.string_utf8.toString(), (payload: Uint8Array, offset: bigint) => 8 + Number(new DataView(payload.buffer, Number(offset), 8).getBigUint64(0, /* littleEndian */ true))],
    ]);

	private static CalculateNeededReadOffsetAdvance(payload: Uint8Array, offset: bigint, originalType: Uint8Array): number
	{
		const typeKeyToUse: string = originalType.toString();
		if (Definitions.isConstantLength.has(typeKeyToUse))
		{
			// For constant types
			return Definitions.GetByteLengthWithAUDALFtype(typeKeyToUse);
		}

		// Dynamic ones
		let calc = (payload: Uint8Array, offset: bigint) => 0; // Init to 0
		if (this.dynamicLengthDeserializationCalculator.has(typeKeyToUse))
		{
			calc = this.dynamicLengthDeserializationCalculator.get(typeKeyToUse)!;
		}
		
		return calc(payload, offset);
	}

	private static Read(payload: Uint8Array, offset: bigint, typeIdAsBytes: Uint8Array, wantedType: string, settings?:DeserializationSettings): any
	{
		const numberOffset = Number(offset);
		if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.specialType))
		{
			return null;
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_8_bit_integerType))
		{
			return new DataView(payload.buffer, numberOffset, 1).getUint8(0);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_8_bit_integerArrayType))
		{
			const byteArrayLengthInBytes: bigint = new DataView(payload.buffer, numberOffset, 8).getBigUint64(0);
			const contentOffset: number = numberOffset + 8;
			return payload.slice(contentOffset, contentOffset + Number(byteArrayLengthInBytes));
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_16_bit_integerType))
		{
			return new DataView(payload.buffer, numberOffset, 2).getUint16(0, /* littleEndian */ true);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_32_bit_integerType))
		{
			return new DataView(payload.buffer, numberOffset, 4).getUint32(0, /* littleEndian */ true);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.unsigned_64_bit_integerType))
		{
			return new DataView(payload.buffer, numberOffset, 8).getBigUint64(0, /* littleEndian */ true);
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
			return new DataView(payload.buffer, numberOffset, 2).getInt16(0, /* littleEndian */ true);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.signed_32_bit_integerType))
		{
			return new DataView(payload.buffer, numberOffset, 4).getInt32(0, /* littleEndian */ true);
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
			return new DataView(payload.buffer, numberOffset, 8).getBigInt64(0, /* littleEndian */ true);
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
			return new DataView(payload.buffer, numberOffset, 4).getFloat32(0, /* littleEndian */ true);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.floating_point_64_bit))
		{
			return new DataView(payload.buffer, numberOffset, 8).getFloat64(0, /* littleEndian */ true);
		}
		else if (Definitions.ByteArrayCompare(typeIdAsBytes, Definitions.string_utf8))
		{
			const stringLengthInBytes: bigint = new DataView(payload.buffer, numberOffset, 8).getBigUint64(0, /* littleEndian */ true);
			const contentOffset: number = numberOffset + 8;
			const stringContent: Uint8Array = payload.slice(contentOffset, contentOffset + Number(stringLengthInBytes));
			return new TextDecoder("utf-8").decode(stringContent);
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