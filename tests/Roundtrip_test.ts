import { assert, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { AUDALF_Serialize } from "../src/audalf_serialize.ts";
import { AUDALF_Deserialize } from "../src/audalf_deserialize.ts";
import { AUDALF_Definitions as Definitions, SerializationSettings, DeserializationSettings, DateTimeFormat } from "../src/AUDALF_Definitions.ts";

// ByteArrayRoundtripTest()
Deno.test("Byte array roundtrip test", () => {
  // Arrange
  const byteArray: Uint8Array = new Uint8Array([0, 1, 10, 100, 255]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(byteArray);
  const byteArrayDeserialized: Uint8Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(byteArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(Definitions.ByteArrayCompare(byteArray, byteArrayDeserialized), true, "Arrays should match");
});

// UShortArrayRoundtripTest()
Deno.test("Ushort array roundtrip test", () => {
  // Arrange
  const ushortArray: Uint16Array = new Uint16Array([0, 1, 10, 100, 1000, 65535]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(ushortArray);
  const ushortArrayDeserialized: Uint16Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(ushortArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(ushortArray, ushortArrayDeserialized, "Arrays should match");
});

// UintArrayRoundtripTest()
Deno.test("Uint array roundtrip test", () => {
  // Arrange
  const uintArray: Uint32Array = new Uint32Array([0, 1, 10, 100, 1000, 4294967295]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(uintArray);
  const uintArrayDeserialized: Uint32Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(uintArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(uintArray, uintArrayDeserialized, "Arrays should match");
});

// UlongArrayRoundtripTest()
Deno.test("Ulong array roundtrip test", () => {
  // Arrange
  const ulongArray : BigUint64Array = new BigUint64Array([0n, 1n, 10n, 100n, 1000n, 1000000n, 1000000000n, 18446744073709551615n]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(ulongArray);
  const ulongArrayDeserialized: BigUint64Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(ulongArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(ulongArray, ulongArrayDeserialized, "Arrays should match");
});

// SByteArrayRoundtripTest()
Deno.test("SByte array roundtrip test", () => {
  // Arrange
  const sbyteArray: Int8Array = new Int8Array([-128, 0, 1, 10, 100, 127]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(sbyteArray);
  const sbyteArrayDeserialized: Int8Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(sbyteArrayDeserialized.length > 0, true, "Sbyte array deserialized should NOT be empty");
  assertEquals(sbyteArray, sbyteArrayDeserialized, "Arrays should match");
});

// ShortArrayRoundtripTest
Deno.test("Short array roundtrip test", () => {
  // Arrange
  const shortArray: Int16Array = new Int16Array([-32768, 0, 1, 10, 100, 1000, 32767]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(shortArray);
  const shortArrayDeserialized: Int16Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(shortArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(shortArray, shortArrayDeserialized, "Arrays should match");
});

// IntArrayRoundtripTest()
Deno.test("Int array roundtrip test", () => {
  // Arrange
  const intArray : Int32Array = new Int32Array([-2147483648, 1, 10, 100, 1000, 1000000, 2147483647]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(intArray);
  const intArrayDeserialized: Int32Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(intArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(intArray, intArrayDeserialized, "Arrays should match");
});

// LongArrayRoundtripTest()
Deno.test("Long array roundtrip test", () => {
  // Arrange
  const longArray : BigInt64Array = new BigInt64Array([-9223372036854775808n, 0n, 1n, 10n, 100n, 1000n, 1000000n, 1000000000n, 9223372036854775807n]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(longArray);
  const longArrayDeserialized: BigInt64Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(longArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(longArray, longArrayDeserialized, "Arrays should match");
});

// FloatArrayRoundtripTest()
Deno.test("Float array roundtrip test", () => {
  // Arrange
  const floatArray : Float32Array = new Float32Array([-3.40282347E+38, -1, 3.14, 3.40282347E+38]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(floatArray);
  const floatArrayDeserialized: Float32Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(floatArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(floatArray, floatArrayDeserialized, "Arrays should match");
});

// DoubleArrayRoundtripTest()
Deno.test("Double array roundtrip test", () => {
  // Arrange
  const doubleArray : Float64Array = new Float64Array([-1.7976931348623157E+308, -1, 0.0, 3.14, 1.7976931348623157E+308]);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(doubleArray);
  const doubleArrayDeserialized: Float64Array = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(doubleArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(doubleArray, doubleArrayDeserialized, "Arrays should match");
});

// StringArrayRoundtripTest()
Deno.test("String array roundtrip test", () => {
  // Arrange
  const stringArray: string[] = [ "something", "null", "🐱" ];

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(stringArray);
  const stringArrayDeserialized: string[] = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(stringArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(stringArray, stringArrayDeserialized, "Arrays should match");
});

// DateTimeArrayRoundtripTest()
Deno.test("Date array roundtrip test", () => {
  // Arrange
  const dateArray: Date[] = [ new Date(1966, 1, 1), new Date(2000, 2, 28), new Date(2022, 6, 6) ];
  const serializationSettings: SerializationSettings = new SerializationSettings();
  serializationSettings.dateTimeFormat = DateTimeFormat.UnixInMilliseconds;

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(dateArray, serializationSettings);
  const dateArrayDeserialized: Date[] = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(dateArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(dateArray, dateArrayDeserialized, "Arrays should match");
});

// BooleansArrayRoundtripTest()
Deno.test("Booleans array roundtrip test", () => {
  // Arrange
  const boolArray: boolean[] = [ true, true, true, false, true, false, false, true, false ];

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(boolArray);
  const boolArrayDeserialized: Date[] = AUDALF_Deserialize.Deserialize(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(boolArrayDeserialized.length > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(boolArray, boolArrayDeserialized, "Arrays should match");
});

// ByteByteDictionaryRoundtripTest()
Deno.test("Byte-byte dictionary roundtrip test", () => {
  // Arrange
  const byteByteMap: Map<number, number> = new Map<number, number>([[0, 1], [10, 11], [254, 255]]);

  const serializationSettings: SerializationSettings = new SerializationSettings();
  serializationSettings.wantedDictionaryKeyType = Definitions.unsigned_8_bit_integerType;
  serializationSettings.wantedDictionaryValueType = Definitions.unsigned_8_bit_integerType;

  const deserializationSettings: DeserializationSettings = new DeserializationSettings();
  deserializationSettings.wantedMap = true;

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(byteByteMap, serializationSettings);
  const byteByteMapDeserialized: Map<number, number> = AUDALF_Deserialize.Deserialize(result, false, deserializationSettings);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(byteByteMapDeserialized.size > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(byteByteMap, byteByteMapDeserialized, "Maps should match");
});

// IntIntDictionaryRoundtripTest()
Deno.test("Int-int dictionary roundtrip test", () => {
  // Arrange
  const intIntMap: Map<number, number> = new Map<number, number>([[-2147483648, -2147483647], [0, 1], [10, 11], [100, 101], [10000, 10001], [2147483646, 2147483647]]);

  const serializationSettings: SerializationSettings = new SerializationSettings();
  serializationSettings.wantedDictionaryKeyType = Definitions.signed_32_bit_integerType;
  serializationSettings.wantedDictionaryValueType = Definitions.signed_32_bit_integerType;

  const deserializationSettings: DeserializationSettings = new DeserializationSettings();
  deserializationSettings.wantedMap = true;

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(intIntMap, serializationSettings);
  const intIntMapDeserialized: Map<number, number> = AUDALF_Deserialize.Deserialize(result, false, deserializationSettings);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(intIntMapDeserialized.size > 0, true, "Byte array deserialized should NOT be empty");
  assertEquals(intIntMap, intIntMapDeserialized, "Maps should match");
});