enum AUDALFtypes
{
    byte,
    ushort,
    uint,
    ulong,

    sbyte,
    short,
    int,
    long,

    float,
    double,

    string,

    bool,

    biginteger
}

/// <summary>
/// Date time format
/// </summary>
enum DateTimeFormat
{
    /// <summary>
    /// ISO8601, Default value
    /// </summary>
    ISO8601 = 0,

    /// <summary>
    /// Unix milliseconds
    /// </summary>
    UnixInMilliseconds,

    /// <summary>
    /// Unix seconds
    /// </summary>
    UnixInSeconds
}

/// <summary>
/// Serialization settings
/// </summary>
export class SerializationSettings
{
    /// <summary>
    /// Date time format for serialization
    /// </summary>
    public dateTimeFormat: DateTimeFormat = DateTimeFormat.ISO8601;
}

/// <summary>
/// Deserialization Settings
/// </summary>
export class DeserializationSettings
{
    /// <summary>
    /// Wanted time type for deserialization
    /// </summary>
    public wantedDateTimeType: AUDALFtypes = AUDALFtypes.byte;
}

/// <summary>
/// Definitons that are static
/// </summary>
export class AUDALF_Definitions
{
    // #region Errors

    private static readonly CannotParseTypeError: string = "Cannot parse type!";

    // #endregion

    /// <summary>
    /// FourCC identifier as byte array
    /// </summary>
    /// <value>AUDA aka 0x41, 0x55, 0x44, 0x41</value>
    public static readonly fourCC: Uint8Array = new Uint8Array([0x41, 0x55, 0x44, 0x41]);

    /// <summary>
    /// Version number of current AUDALF
    /// </summary>
    /// <value>1 aka 0x01, 0x00, 0x00, 0x00</value>
    public static readonly versionNumber: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x00]);

    /// <summary>
    /// Payload size placeholder
    /// </summary>
    /// <value>0</value>
    public static readonly payloadSizePlaceholder: Uint8Array = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

    /// <summary>
    /// Special type byte array. Reserved for special cases
    /// </summary>
    /// <value>0</value>
    public static readonly specialType: Uint8Array = new Uint8Array([ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);


    // #region Unsigned integer

    /// <summary>
    /// Unsigned 8 bit integer, equals byte, range [0 .. 255]
    /// </summary>
    /// <value>1</value>
    public static readonly unsigned_8_bit_integerType: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 16 bit integer, range [0 .. 65535]
    /// </summary>
    /// <value>2</value>
    public static readonly unsigned_16_bit_integerType: Uint8Array = new Uint8Array([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 32 bit integer, range [0 .. 4294967295]
    /// </summary>
    /// <value>3</value>
    public static readonly unsigned_32_bit_integerType: Uint8Array = new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 64 bit integer, range [0 .. 18446744073709551615]
    /// </summary>
    /// <value>4</value>
    public static readonly unsigned_64_bit_integerType: Uint8Array = new Uint8Array([0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 128 bit integer, range [0 .. 2^128 − 1]
    /// </summary>
    /// <value>5</value>
    public static readonly unsigned_128_bit_integerType: Uint8Array = new Uint8Array([0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 256 bit integer, range [0 .. 2^256 − 1]
    /// </summary>
    /// <value>6</value>
    public static readonly unsigned_256_bit_integerType: Uint8Array = new Uint8Array([0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 512 bit integer, range [0 .. 2^512 − 1]
    /// </summary>
    /// <value>7</value>
    public static readonly unsigned_512_bit_integerType: Uint8Array = new Uint8Array([0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 1024 bit integer, range [0 .. 2^1024 − 1]
    /// </summary>
    /// <value>8</value>
    public static readonly unsigned_1024_bit_integerType: Uint8Array = new Uint8Array([0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 2048 bit integer, range [0 .. 2^2048 − 1]
    /// </summary>
    /// <value>9</value>
    public static readonly unsigned_2048_bit_integerType: Uint8Array = new Uint8Array([0x09, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Unsigned 4096 bit integer, range [0 .. 2^4096 − 1]
    /// </summary>
    /// <value>10</value>
    public static readonly unsigned_4096_bit_integerType: Uint8Array = new Uint8Array([0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion

    // #region Unsigned integer array

    /// <summary>
    /// Array of unsigned 8 bit integers
    /// </summary>
    /// <value>65537</value>
    public static readonly unsigned_8_bit_integerArrayType: Uint8Array = new Uint8Array([0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 16 bit integers
    /// </summary>
    /// <value>65538</value>
    public static readonly unsigned_16_bit_integerArrayType: Uint8Array = new Uint8Array([0x02, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 32 bit integers
    /// </summary>
    /// <value>65539</value>
    public static readonly unsigned_32_bit_integerArrayType: Uint8Array = new Uint8Array([0x03, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 64 bit integers
    /// </summary>
    /// <value>65540</value>
    public static readonly unsigned_64_bit_integerArrayType: Uint8Array = new Uint8Array([0x04, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 128 bit integers
    /// </summary>
    /// <value>65541</value>
    public static readonly unsigned_128_bit_integerArrayType: Uint8Array = new Uint8Array([0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 256 bit integers
    /// </summary>
    /// <value>65542</value>
    public static readonly unsigned_256_bit_integerArrayType: Uint8Array = new Uint8Array([0x06, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 512 bit integers
    /// </summary>
    /// <value>65543</value>
    public static readonly unsigned_512_bit_integerArrayType: Uint8Array = new Uint8Array([0x07, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 1024 bit integers
    /// </summary>
    /// <value>65544</value>
    public static readonly unsigned_1024_bit_integerArrayType: Uint8Array = new Uint8Array([0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 2048 bit integers
    /// </summary>
    /// <value>65545</value>
    public static readonly unsigned_2048_bit_integerArrayType: Uint8Array = new Uint8Array([0x09, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of unsigned 4096 bit integers
    /// </summary>
    /// <value>65546</value>
    public static readonly unsigned_4096_bit_integerArrayType: Uint8Array = new Uint8Array([0x0A, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion 

    // #region Signed integer

    /// <summary>
    /// Signed 8 bit integer, range [-128 .. 127]
    /// </summary>
    /// <value>16777217</value>
    public static readonly signed_8_bit_integerType: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 16 bit integer, range [-32768 .. 32767]
    /// </summary>
    /// <value>16777218</value>
    public static readonly signed_16_bit_integerType: Uint8Array = new Uint8Array([0x02, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 32 bit integer, range [-2147483648 .. 2 147 483 647]
    /// </summary>
    /// <value>16777219</value>
    public static readonly signed_32_bit_integerType: Uint8Array = new Uint8Array([0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 64 bit integer, range [-9 223 372 036 854 775 808 .. 9 223 372 036 854 775 807]
    /// </summary>
    /// <value>16777220</value>
    public static readonly signed_64_bit_integerType: Uint8Array = new Uint8Array([0x04, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 128 bit integer, range [-2^127 .. 2^127 − 1]
    /// </summary>
    /// <value>16777221</value>
    public static readonly signed_128_bit_integerType: Uint8Array = new Uint8Array([0x05, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 256 bit integer, range [-2^255 .. 2^255 − 1]
    /// </summary>
    /// <value>16777222</value>
    public static readonly signed_256_bit_integerType: Uint8Array = new Uint8Array([0x06, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 512 bit integer, range [-2^511 .. 2^511 − 1]
    /// </summary>
    /// <value>16777223</value>
    public static readonly signed_512_bit_integerType: Uint8Array = new Uint8Array([0x07, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 1024 bit integer, range [-2^1023 .. 2^1023 − 1]
    /// </summary>
    /// <value>16777224</value>
    public static readonly signed_1024_bit_integerType: Uint8Array = new Uint8Array([0x08, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 2048 bit integer, range [-2^2047 .. 2^2047 − 1]
    /// </summary>
    /// <value>16777225</value>
    public static readonly signed_2048_bit_integerType: Uint8Array = new Uint8Array([0x09, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Signed 4096 bit integer, range [-2^4095 .. 2^4095 − 1]
    /// </summary>
    /// <value>16777226</value>
    public static readonly signed_4096_bit_integerType: Uint8Array = new Uint8Array([0x0A, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion


    // #region Signed integer array

    /// <summary>
    /// Array of signed 8 bit integers
    /// </summary>
    /// <value>16842753</value>
    public static readonly signed_8_bit_integerArrayType: Uint8Array = new Uint8Array([0x01, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 16 bit integers
    /// </summary>
    /// <value>16842754</value>
    public static readonly signed_16_bit_integerArrayType: Uint8Array = new Uint8Array([0x02, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 32 bit integers
    /// </summary>
    /// <value>16842755</value>
    public static readonly signed_32_bit_integerArrayType: Uint8Array = new Uint8Array([0x03, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 64 bit integers
    /// </summary>
    /// <value>16842756</value>
    public static readonly signed_64_bit_integerArrayType: Uint8Array = new Uint8Array([0x04, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 128 bit integers
    /// </summary>
    /// <value>16842757</value>
    public static readonly signed_128_bit_integerArrayType: Uint8Array = new Uint8Array([0x05, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 256 bit integers
    /// </summary>
    /// <value>16842758</value>
    public static readonly signed_256_bit_integerArrayType: Uint8Array = new Uint8Array([0x06, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 512 bit integers
    /// </summary>
    /// <value>16842759</value>
    public static readonly signed_512_bit_integerArrayType: Uint8Array = new Uint8Array([0x07, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 1024 bit integers
    /// </summary>
    /// <value>16842760</value>
    public static readonly signed_1024_bit_integerArrayType: Uint8Array = new Uint8Array([0x08, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 2048 bit integers
    /// </summary>
    /// <value>16842761</value>
    public static readonly signed_2048_bit_integerArrayType: Uint8Array = new Uint8Array([0x09, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Array of signed 4096 bit integers
    /// </summary>
    /// <value>16842762</value>
    public static readonly signed_4096_bit_integerArrayType: Uint8Array = new Uint8Array([0x0A, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion


    // #region Floating points

    /// <summary>
    /// 8 bit floating poformat
    /// </summary>
    /// <value>33554433</value>
    public static readonly floating_point_8_bit: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 16 bit floating poformat, binary16 from IEEE 754
    /// </summary>
    /// <value>33554434</value>
    public static readonly floating_point_16_bit: Uint8Array = new Uint8Array([0x02, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 32 bit floating poformat, binary32 from IEEE 754
    /// </summary>
    /// <value>33554435</value>
    public static readonly floating_point_32_bit: Uint8Array = new Uint8Array([0x03, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 64 bit floating poformat, binary64 from IEEE 754
    /// </summary>
    /// <value>33554436</value>
    public static readonly floating_point_64_bit: Uint8Array = new Uint8Array([0x04, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 128 bit floating poformat, binary128 from IEEE 754
    /// </summary>
    /// <value>33554437</value>
    public static readonly floating_point_128_bit: Uint8Array = new Uint8Array([0x05, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 256 bit floating poformat, binary256 from IEEE 754
    /// </summary>
    /// <value>33554438</value>
    public static readonly floating_point_256_bit: Uint8Array = new Uint8Array([0x06, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// 512 bit floating poformat
    /// </summary>
    /// <value>33554439</value>
    public static readonly floating_point_512_bit: Uint8Array = new Uint8Array([0x07, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion


    // #region Strings

    /// <summary>
    /// ASCII string
    /// </summary>
    /// <value>83886081</value>
    public static readonly string_ascii: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// UTF-8 Unicode string
    /// </summary>
    /// <value>83886082</value>
    public static readonly string_utf8: Uint8Array= new Uint8Array([0x02, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// UTF-16 Unicode string
    /// </summary>
    /// <value>83886083</value>
    public static readonly string_utf16: Uint8Array = new Uint8Array([0x03, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// UTF-32 Unicode string
    /// </summary>
    /// <value>83886084</value>
    public static readonly string_utf32: Uint8Array= new Uint8Array([0x04, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion

    // #region Booleans

    /// <summary>
    /// Common boolean. It is either True (1) or False (0)
    /// </summary>
    /// <value>100663297</value>
    public static readonly booleans: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion

    // #region Date / time 

    /// <summary>
    /// Aka POSIX time and UNIX Epoch time in seconds, as 64 bit unsigned integer
    /// </summary>
    /// <value>117440513</value>
    public static readonly datetime_unix_seconds: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// Aka POSIX time and UNIX Epoch time in milliseconds, as 64 bit unsigned integer
    /// </summary>
    /// <value>117440514</value>
    public static readonly datetime_unix_milliseconds: Uint8Array = new Uint8Array([0x02, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00 ]);

    /// <summary>
    /// ISO 8601, as UTF-8 string
    /// </summary>
    /// <value>117440515</value>
    public static readonly datetime_iso_8601: Uint8Array = new Uint8Array([0x03, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion

    // #region Arbitrarily large signed integer

    /// <summary>
    /// Signed integer without range limits	
    /// </summary>
    /// <value>134217729</value>
    public static readonly bigIntegerType: Uint8Array = new Uint8Array([0x01, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00 ]);

    // #endregion

    // #region Known offsets

    /// <summary>
    /// Offset for FourCC
    /// </summary>
    public static readonly fourCCOffset: number = 0;

    /// <summary>
    /// Offset for version
    /// </summary>
    public static readonly versionOffset: number = 4;

    /// <summary>
    /// Offset for payload size
    /// </summary>
    public static readonly payloadSizeOffset: number = 8;

    /// <summary>
    /// Offset for index count
    /// </summary>
    public static readonly indexCountOffset: number = 16;

    /// <summary>
    /// Offset for key type
    /// </summary>
    public static readonly keyTypeOffset: number = 24;

    /// <summary>
    /// Offset for entry definitions
    /// </summary>
    public static readonly entryDefinitionsOffset: number = 32;

    // #endregion


    // #region Types to types pairings

    //private static readonly const typescriptTypeToAUDALF: Map<type, Uint8Array> = new Map<AUDALFtypes, Uint8Array>();
    private static readonly AUDALFtoTypescriptType: Map<string, string> = new Map<string, string>();

    private static readonly AUDALFtoByteLength: Map<string, number> = new Map<string, number>([
        [AUDALF_Definitions.unsigned_8_bit_integerType.toString(), 8],
        [AUDALF_Definitions.unsigned_16_bit_integerType.toString(), 8],
        [AUDALF_Definitions.unsigned_32_bit_integerType.toString(), 8],
        [AUDALF_Definitions.unsigned_64_bit_integerType.toString(), 8],

        [AUDALF_Definitions.signed_8_bit_integerType.toString(), 8],
        [AUDALF_Definitions.signed_16_bit_integerType.toString(), 8],
        [AUDALF_Definitions.signed_32_bit_integerType.toString(), 8],
        [AUDALF_Definitions.signed_64_bit_integerType.toString(), 8],
    ]);

    static AUDALF_Definitions()
    {
        
        // Single values
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.unsigned_8_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.unsigned_16_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.unsigned_32_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.unsigned_64_bit_integerType.toString(), typeof(BigInt));

        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.signed_8_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.signed_16_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.signed_32_bit_integerType.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.signed_64_bit_integerType.toString(), typeof(BigInt));

        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.floating_point_32_bit.toString(), typeof(Number));
        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.floating_point_64_bit.toString(), typeof(Number));

        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.string_utf8.toString(), typeof(String));

        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.booleans.toString(), typeof(Boolean));

        AUDALF_Definitions.AUDALFtoTypescriptType.set(AUDALF_Definitions.bigIntegerType.toString(), typeof(BigInt));

        /*Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.byte, Definitions.unsigned_8_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.ushort, Definitions.unsigned_16_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.uint, Definitions.unsigned_32_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.ulong, Definitions.unsigned_64_bit_integerType);

        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.sbyte, Definitions.signed_8_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.short, Definitions.signed_16_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.int, Definitions.signed_32_bit_integerType);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.long, Definitions.signed_64_bit_integerType);

        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.float, Definitions.floating_point_32_bit);
        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.double, Definitions.floating_point_64_bit);

        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.string, Definitions.string_utf8);

        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.bool, Definitions.booleans);

        Definitions.typescriptTypeToAUDALF.set(AUDALFtypes.biginteger, Definitions.bigIntegerType);*/

        // Arrays
        //dotnetTypeToAUDALF.Add(typeof(byte[]), unsigned_8_bit_integerArrayType);
        //dotnetTypeToAUDALF.Add(typeof(ushort[]), unsigned_16_bit_integerArrayType);
        //dotnetTypeToAUDALF.Add(typeof(uint[]), unsigned_32_bit_integerArrayType);
        //dotnetTypeToAUDALF.Add(typeof(int[]), signed_32_bit_integerArrayType);
        //dotnetTypeToAUDALF.Add(typeof(long[]), signed_64_bit_integerArrayType);

        // DateTimes are missing for reason, they have Settings for choosing wanted serialization
    }

    public static GetTypescriptTypeWithAUDALFtype(tsType: string): string
    {
        return AUDALF_Definitions.AUDALFtoTypescriptType.get(tsType!)!;
    }

    public static GetByteLengthWithAUDALFtype(tsType: string): number
    {
        return AUDALF_Definitions.AUDALFtoByteLength.get(tsType!)!;
    }

    /// <summary>
    /// Get AUDALF type with Dotnet type
    /// </summary>
    /// <param name="type">Dotnet type</param>
    /// <returns>Byte array that contains eight bytes that tell AUDALF type</returns>
    /*public static GetAUDALFtypeWithDotnetType(type: AUDALFtypes): Uint8Array
    {
        return  Definitions.dotnetTypeToAUDALF[type];
    }*/

    /// <summary>
    /// Get Dotnet type with AUDALF
    /// </summary>
    /// <param name="audalfBytes">Byte array with 8 AUDALF type bytes</param>
    /// <returns>Type</returns>
    /*public static Type GetDotnetTypeWithAUDALFtype(audalfBytes: Uint8Array)
    {
        foreach (KeyValuePair<Type, byte[]> entry in dotnetTypeToAUDALF)
        {
            if (ByteArrayCompare(entry.Value, audalfBytes))
            {
                return entry.Key;
            }
        }

        throw new ArgumentNullException(CannotParseTypeError);
    }*/

    // #endregion

    // #region Common comparision

    /// <summary>
    /// Compare if two byte arrays are equal
    /// </summary>
    /// <param name="a1">First byte array</param>
    /// <param name="a2">Second byte array</param>
    /// <returns>True if they are equal; False otherwise</returns>
    public static ByteArrayCompare(a1: Uint8Array, a2: Uint8Array): boolean
    {
        if (a1.byteLength != a2.byteLength) { 
            return false;
        }

        for (var i = 0 ; i != a1.byteLength ; i++) {
            if (a1[i] != a2[i]) {
                return false;
            }
        }

        return true;
    }

    // #endregion

    //#region Common math

    /// <summary>
    /// Find next offset that is divisable by 8. E.g. 23 would return 24
    /// </summary>
    /// <param name="current">Current address/offset</param>
    /// <returns>Next value</returns>
    public static NextDivisableBy8(current: number): number
    {
        const bits: number = current & 7;
        if (bits == 0) return current;
        return current + (8 - bits);
    }

    // #endregion
}