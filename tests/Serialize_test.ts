import { assert, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { AUDALF_Serialize } from "../src/audalf_serialize.ts";
import { AUDALF_Deserialize } from "../src/audalf_deserialize.ts";
import { AUDALF_Definitions as Definitions } from "../src/AUDALF_Definitions.ts";

// DeserializeAUDALFBytesToByteArray()
Deno.test("Serialize byte array to AUDALF bytes", () => {
  // Arrange
  const byteArray: Uint8Array = new Uint8Array([0, 1, 10, 100, 255]);

  const entryDefinitionsOffset: bigint = BigInt(Definitions.entryDefinitionsOffset);

  // Act
  const result: Uint8Array = AUDALF_Serialize.Serialize(byteArray);
  const isAUDALF: boolean = AUDALF_Deserialize.IsAUDALF(result);
  const versionNumber: number = AUDALF_Deserialize.GetVersionNumber(result);
	const byteSize: bigint = AUDALF_Deserialize.GetByteSize(result);
	const isDictionary: boolean = AUDALF_Deserialize.IsDictionary(result);
	const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(result);
	const entryDefinitionOffsets: bigint[] = AUDALF_Deserialize.GetEntryDefinitionOffsets(result);

  // Assert
  assertEquals(result.length > 0, true, "Result should NOT be empty");
  assertEquals(isAUDALF, true, "Result should be AUDALF payload");
  assertEquals(versionNumber, new DataView(Definitions.versionNumber.buffer, 0, 4).getUint32(0, /* littleEndian */ true), "Result should have correct version number");
  assertEquals(result.length, Number(byteSize), "Result payload should have correct amount lenght info");
  assertEquals(isDictionary, false, "Result should contain an array, not a dictionary");
  assertEquals(byteArray.length, Number(indexCount), "Result should contain certain number of items");
  assertEquals(indexCount, BigInt(entryDefinitionOffsets.length), "Result should have certain number of entry definitions");
  
  for (const u of entryDefinitionOffsets)
  {
    assert(u > entryDefinitionsOffset, "Each entry definition should point to valid address inside the payload");
    assert(u < byteSize, "Each entry definition should point to valid address inside the payload");
    assertEquals(u % 8n === 0n, true, "Every offset should align to 8 bytes (64 bits)");
  }
});