import { AUDALF_Definitions as Definitions, SerializationSettings, DateTimeFormat } from "./AUDALF_Definitions.ts";

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
        const increasePos = Uint8Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setUint8(this.curPos, byte);
        this.curPos += increasePos;
    }

    public WriteByteArray(uint8ArrayToWrite: Uint8Array): void
    {
        const increasePos = uint8ArrayToWrite.length;
        this.byteArray.set(uint8ArrayToWrite, this.curPos);
        this.curPos += increasePos;
    }

    public WriteUshort(ushort: number): void
    {
        const increasePos = Uint16Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setUint16(this.curPos, ushort, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteUshortArray(uint16ArrayToWrite: Uint16Array): void
    {
        // TODO: Add this
    }

    public WriteUint(uint: number): void
    {
        const increasePos = Uint32Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setUint32(this.curPos, uint, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteUintArray(uint32ArrayToWrite: Uint32Array): void
    {
        // TODO: Add this
    }

    public WriteUlong(ulong: bigint): void
    {
        const increasePos = BigUint64Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setBigUint64(this.curPos, ulong, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteSByte(sbyte: number): void
    {
        const increasePos = Int8Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setInt8(this.curPos, sbyte);
        this.curPos += increasePos;
    }

    public WriteShort(ushort: number): void
    {
        const increasePos = Int16Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setInt16(this.curPos, ushort, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteInt(int: number): void
    {
        const increasePos = Int32Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setInt32(this.curPos, int, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteLong(long: bigint): void
    {
        const increasePos = BigInt64Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setBigInt64(this.curPos, long, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteFloat(float: number): void
    {
        const increasePos = Float32Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setFloat32(this.curPos, float, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteDouble(float: number): void
    {
        const increasePos = Float64Array.BYTES_PER_ELEMENT;
        new DataView(this.byteArray.buffer).setFloat64(this.curPos, float, /* littleEndian*/ true);
        this.curPos += increasePos;
    }

    public WriteStringAsUtf8(str: string): void
    {
        const encodedText: Uint8Array = new TextEncoder().encode(str);

        // First write the length
        this.WriteNumberAs64BitUnsigned(encodedText.length);

        
        const increasePos: number = encodedText.length;

        // Then write actual content
        this.byteArray.set(encodedText, this.curPos);
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

    public WriteDateAsUnixSeconds(date: Date): void
    {
        // Convert milliseconds to seconds
        this.WriteLong(BigInt(Math.round(date.getTime() / 1000)));
    }

    public WriteDateAsUnixMilliSeconds(date: Date): void
    {
        this.WriteLong(BigInt(Math.round(date.getTime())));
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

interface WriterDefinition 
{
    howManyBytesAreWritten: number;
    writerFunc: (writer: ByteWriter, value: any) => void;
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
        else if (object instanceof Uint16Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.unsigned_16_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Uint32Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.unsigned_32_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof BigUint64Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.unsigned_64_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Int8Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.signed_8_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Int16Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.signed_16_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Int32Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.signed_32_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof BigInt64Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.signed_64_bit_integerType, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Float32Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.floating_point_32_bit, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Float64Array)
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.floating_point_64_bit, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (Array.isArray(object) && object.every((value) => value instanceof Date))
        {
            if (serializationSettings && serializationSettings.dateTimeFormat === DateTimeFormat.UnixInMilliseconds)
            {
                // In case unix milliseconds (since epoch) are wanted
                const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.datetime_unix_milliseconds, serializationSettings);
                return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
            }
            else if (serializationSettings && serializationSettings.dateTimeFormat === DateTimeFormat.UnixInSeconds)
            {
                // In case unix seconds (since epoch) are wanted
                const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(Array.from(object), Definitions.datetime_unix_seconds, serializationSettings);
                return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
            }
            else
            {
                // In case ISO8601 formatted strings are wanted
            }
        }
        else if (Array.isArray(object) && object.every((value) => typeof value === 'string'))
        {
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateListKeyValuePairs(object, Definitions.string_utf8, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], Definitions.specialType);
        }
        else if (object instanceof Map)
        {
            
            const dataAndPairs: [Uint8Array, number[]] = AUDALF_Serialize.GenerateDictionaryKeyValuePairs(object, serializationSettings);
            return AUDALF_Serialize.GenericSerialize(dataAndPairs[0], dataAndPairs[1], serializationSettings.wantedDictionaryKeyType);
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

    private static readonly dynamicLengthSerializationCalculator: Map<string, (value: any) => number> = new Map<string, (value: any) => number>([
        [Definitions.string_utf8.toString(), (value: any) => 8 + new TextEncoder().encode(value).length],
    ]);

    private static CalculateNeededListBytes(values: any[], originalType: Uint8Array | null): number
    {
        if (originalType != null)
        {
            const typeKeyToUse: string = originalType.toString();
            if (Definitions.isConstantLength.has(typeKeyToUse))
            {
                // List index + value type + actual value in bytes
                return values.length * (8 + 8 + Definitions.GetByteLengthWithAUDALFtype(typeKeyToUse));
            }
            else
            {
                let calc = (value: any) => 0; // Init to 0
                if (this.dynamicLengthSerializationCalculator.has(typeKeyToUse))
                {
                    calc = this.dynamicLengthSerializationCalculator.get(typeKeyToUse)!;
                }
                // Each value must be calculated separately
                let total: number = 0;
                for (let i = 0; i < values.length; i++)
                {
                    total += (8 + 8 + Definitions.NextDivisableBy8(calc(values[i])));
                }

                return total;
            }
        }

        let total: number = 0;

        // TODO: Implement this
        /*for (let i = 0; i < positions.length; i++)
        {

        }*/

        return total;
    }

    private static CheckIfAllDictionaryKeysHaveSameType<K, V extends any>(map: Map<K, V>): boolean
    {
        let lastType: string | null = null;
        let returnValue: boolean = true;
        Array.from(map.entries()).forEach(([k, v]) => {
            if (lastType == null)
            {
                lastType = typeof k;
            }
            else if (lastType !== typeof k)
            {
                returnValue = false;
            }
        });

        return returnValue;
    }

    private static CheckIfAllDictionaryValueHaveSameType<K, V extends any>(map: Map<K, V>): boolean
    {
        let lastType: string | null = null;
        let returnValue: boolean = true;
        Array.from(map.entries()).forEach(([k, v]) => {
            if (lastType == null)
            {
                lastType = typeof v;
            }
            else if (lastType !== typeof v)
            {
                returnValue = false;
            }
        });

        return returnValue;
    }

    private static CalculateNeededDictionaryBytes<K, V extends any>(map: Map<K, V>, originalKeyType: Uint8Array | null, originalValueType: Uint8Array | null): number
    {
        // Since all the keys use same calculation, figure it out at this point
        let keySizecalc: (value: any) => number; // Undefined by default
        if (originalKeyType != null)
        {
            const typeKeyToUse: string = originalKeyType.toString();
            if (Definitions.isConstantLength.has(typeKeyToUse))
            {
                keySizecalc = (value: any) => Definitions.GetByteLengthWithAUDALFtype(typeKeyToUse);
            }
            else
            {
                if (this.dynamicLengthSerializationCalculator.has(typeKeyToUse))
                {
                    keySizecalc = this.dynamicLengthSerializationCalculator.get(typeKeyToUse)!;
                }
            }
        }
        else
        {
            const stringTypeOfKey: string = typeof map.keys().next().value;
        }

        let total: number = 0;

        Array.from(map.entries()).forEach(([k, v]) => {

            let keySizeInBytes: number = 0;
            if (keySizecalc != undefined)
            {
                keySizeInBytes += keySizecalc(k);
            }
            else
            {
                throw Error("Cannot calculate size of key of type");
            }

            let valueSizeInBytes: number = 0;

            if (originalValueType != null)
            {
                const typeKeyToUse: string = originalValueType.toString();
                if (Definitions.isConstantLength.has(typeKeyToUse))
                {
                    valueSizeInBytes = 8 + Definitions.GetByteLengthWithAUDALFtype(typeKeyToUse);
                }
            }
            
            total += (keySizeInBytes + valueSizeInBytes);
        });

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

    private static GenerateDictionaryKeyValuePairs<T,V>(pairs: Map<unknown, unknown>, serializationSettings: SerializationSettings | null = null): [Uint8Array, number[]]
    {
        const keysHaveSameType: boolean = this.CheckIfAllDictionaryKeysHaveSameType(pairs);
        if (!keysHaveSameType)
        {
            throw Error("ADAULF does not support different key types in Dictionary/Map!");
        }

        const valuesHaveSameType: boolean = this.CheckIfAllDictionaryValueHaveSameType(pairs);

        let chosenKeyType: Uint8Array = Definitions.specialType;

        if (serializationSettings == null || Definitions.ByteArrayCompare(serializationSettings.wantedDictionaryKeyType, Definitions.specialType))
        {
            // No key type set, we have to figure it out
        }
        else
        {
            // Certain key type requested
            chosenKeyType = serializationSettings.wantedDictionaryKeyType;
        }

        let chosenValueType: Uint8Array = Definitions.specialType;

        if (serializationSettings == null || Definitions.ByteArrayCompare(serializationSettings.wantedDictionaryValueType, Definitions.specialType))
        {
            // No value type set, we have to figure it out
        }
        else
        {
            // Certain value type requested
            chosenValueType = serializationSettings.wantedDictionaryValueType;
        }

        const offsets: number[] = new Array(pairs.size);

        const tempArray: Uint8Array = new Uint8Array(AUDALF_Serialize.CalculateNeededDictionaryBytes(pairs, chosenKeyType, chosenValueType));

        const writer: ByteWriter = new ByteWriter(tempArray);

        let offsetIndex: number = 0;

        Array.from(pairs.entries()).forEach(([k, v]) => {
            offsets[offsetIndex] = writer.curPos;
            offsetIndex++;

            this.WriteOneDictionaryKeyValuePair(writer, k, chosenKeyType, v, chosenValueType, serializationSettings);
        });

        return [writer.byteArray, offsets];
    }

    private static FigureOutTypeOfValue<T>(key: T, value: unknown, valueTypes: Map<T, string>): string | null
    {
        // ValueTypes will override everything else
        if (valueTypes.has(key))
        {
            return valueTypes.get(key)!;
        }
        else if (value != null)
        {
            return typeof value;
        }

        // Not good, return null
        return null;
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

    private static WriteOneDictionaryKeyValuePair(writer: ByteWriter, key: any, originalKeyType: Uint8Array, value: any, originalValueType: Uint8Array, serializationSettings: SerializationSettings | null): void
    {
        AUDALF_Serialize.GenericWrite(writer, key, originalKeyType, /*isKey*/ true, serializationSettings);
        AUDALF_Serialize.GenericWrite(writer, value, originalValueType, /*isKey*/ false, serializationSettings);
    }

    private static readonly writerConstantDefinitions: Map<string, WriterDefinition> = new Map<string, WriterDefinition>([
        // Unsigned ints
        [Definitions.unsigned_8_bit_integerType.toString(), { howManyBytesAreWritten: Uint8Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteByte(value) } }],
        [Definitions.unsigned_16_bit_integerType.toString(), { howManyBytesAreWritten: Uint16Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteUshort(value) } }],
        [Definitions.unsigned_32_bit_integerType.toString(), { howManyBytesAreWritten: Uint32Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteUint(value) } }],
        [Definitions.unsigned_64_bit_integerType.toString(), { howManyBytesAreWritten: BigUint64Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteUlong(value) } }],

        // Signed ints
        [Definitions.signed_8_bit_integerType.toString(), { howManyBytesAreWritten: Int8Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteSByte(value) } }],
        [Definitions.signed_16_bit_integerType.toString(), { howManyBytesAreWritten: Int16Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteShort(value) } }],
        [Definitions.signed_32_bit_integerType.toString(), { howManyBytesAreWritten: Int32Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteInt(value) } }],
        [Definitions.signed_64_bit_integerType.toString(), { howManyBytesAreWritten: BigInt64Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteLong(value) } }],

        // Floating points
        [Definitions.floating_point_32_bit.toString(), { howManyBytesAreWritten: Float32Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteFloat(value) } }],
        [Definitions.floating_point_64_bit.toString(), { howManyBytesAreWritten: Float64Array.BYTES_PER_ELEMENT, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteDouble(value) } }],

        // Dates
        [Definitions.datetime_unix_seconds.toString(), { howManyBytesAreWritten: 8, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteDateAsUnixSeconds(value) } }],
        [Definitions.datetime_unix_milliseconds.toString(), { howManyBytesAreWritten: 8, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteDateAsUnixMilliSeconds(value) } }],
    ]);

    private static readonly writerDynamicDefinitions: Map<string, WriterDefinition> = new Map<string, WriterDefinition>([
        [Definitions.string_utf8.toString(), { howManyBytesAreWritten: -1, writerFunc: (writer: ByteWriter, value: any) => { writer.WriteStringAsUtf8(value) } }],
    ]);  

    private static GenericWrite(writer: ByteWriter, variableToWrite: any, originalType: Uint8Array, isKey: boolean, serializationSettings: SerializationSettings | null): void
    {
        const typeKeyToUse: string = originalType.toString();
        if (AUDALF_Serialize.writerConstantDefinitions.has(typeKeyToUse))
        {
            if (!isKey)
            {
                // Write value type ID (8 bytes)
                writer.WriteByteArray(originalType);
            }

            const writerDef: WriterDefinition = AUDALF_Serialize.writerConstantDefinitions.get(typeKeyToUse)!;

            writerDef.writerFunc(writer, variableToWrite);
            writer.WriteZeroBytes(8 - writerDef.howManyBytesAreWritten);
        }
        else if (AUDALF_Serialize.writerDynamicDefinitions.has(typeKeyToUse))
        {
            if (variableToWrite === null)
            {
                // We have to error out if null is used as key
                if (isKey)
                {
                    throw new Error(AUDALF_Serialize.KeyCannotBeNullError);
                }

                AUDALF_Serialize.WriteSpecialNullType(writer, originalType);
            }
            else
            {
                if (!isKey)
                {
                    // Write value type ID (8 bytes)
                    writer.WriteByteArray(originalType);
                }

                const writerDef: WriterDefinition = AUDALF_Serialize.writerDynamicDefinitions.get(typeKeyToUse)!;

                writerDef.writerFunc(writer, variableToWrite);
                const howManyZeroesToWrite: number = Definitions.NextDivisableBy8(writer.curPos) - writer.curPos;
                writer.WriteZeroBytes(howManyZeroesToWrite);
            }
        }
    }

    private static WriteSpecialNullType(writer: ByteWriter, originalType: Uint8Array): void
    {
        writer.WriteByteArray(Definitions.specialType);
        writer.WriteByteArray(originalType);
    }
}