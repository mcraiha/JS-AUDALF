import { assert, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { AUDALF_Serialize } from "../src/audalf_serialize.ts";
import { AUDALF_Deserialize } from "../src/audalf_deserialize.ts";
import { AUDALF_Definitions as Definitions } from "../src/AUDALF_Definitions.ts";

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

// UintArrayRoundtripTest()
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

// UlongArrayRoundtripTest()
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