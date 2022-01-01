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