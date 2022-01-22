import { assert, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { AUDALF_Deserialize } from "../src/audalf_deserialize.ts";
import { AUDALF_Definitions as Definitions } from "../src/AUDALF_Definitions.ts";

// DeserializeAUDALFBytesToByteArray()
Deno.test("Deserialize AUDALF bytes to byte array", () => {
  // Arrange
  const inputArray: Uint8Array = new Uint8Array([ /* FOURCC*/ 0x41, 0x55, 0x44, 0x41, 
    /* VERSION NUMBER */ 0x01, 0x00, 0x00, 0x00, 
    /* SIZE OF WHOLE ARRAY */ 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* INDEX COUNT */ 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY TYPE */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #1 */ 0x48, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #2 */ 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #3 */ 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #4 */ 0x90, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #5 */ 0xA8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #1 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE TYPE ID #1 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #1 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #2 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE TYPE ID #2 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #2 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #3 */ 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE TYPE ID #3 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #3 */ 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #4 */ 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE TYPE ID #4 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #4 */ 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #5 */ 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE TYPE ID #5 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #5 */ 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 
  ]);

  const entryDefinitionsOffset: bigint = BigInt(Definitions.entryDefinitionsOffset);

  const expected: Uint8Array = new Uint8Array ( [0, 1, 10, 100, 255] );

  // Act
  const isAUDALF: boolean = AUDALF_Deserialize.IsAUDALF(inputArray);
  const versionNumber:number = AUDALF_Deserialize.GetVersionNumber(inputArray);
  const byteSize: bigint = AUDALF_Deserialize.GetByteSize(inputArray);
  const isDictionary: boolean = AUDALF_Deserialize.IsDictionary(inputArray);
  const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(inputArray);
  const entryDefinitionOffsets: bigint[] = AUDALF_Deserialize.GetEntryDefinitionOffsets(inputArray);
  const sameTypes: [boolean, Uint8Array | null] = AUDALF_Deserialize.CheckIfAllListEntryDefinitionsHaveSameValueTypes(inputArray, entryDefinitionOffsets);
  const byteArray: Uint8Array = AUDALF_Deserialize.Deserialize(inputArray);

  // Assert
  assertEquals(isAUDALF, true, "Result should be AUDALF payload");
  assertEquals(versionNumber, new DataView(Definitions.versionNumber.buffer, 0, 4).getUint32(0, /* littleEndian */ true), "Result should have correct version number");
  assertEquals(isDictionary, false, "Result should contain an array, not a dictionary");
  assertEquals(indexCount, BigInt(entryDefinitionOffsets.length), "Result should have certain number of entry definitions");
  assertEquals(sameTypes[0], true, "All elements should have same type");
  assertEquals(Definitions.ByteArrayCompare(byteArray, expected), true, "Arrays should match");

  for (const u of entryDefinitionOffsets)
  {
    assert(u > entryDefinitionsOffset, "Each entry definition should point to valid address inside the payload");
    assert(u < byteSize, "Each entry definition should point to valid address inside the payload");
    assertEquals(u % 8n === 0n, true, "Every offset should align to 8 bytes (64 bits)");
  }
});

Deno.test("Deserialize AUDALF bytes to int32 array", () => {
  // Arrange
  const inputArray: Uint8Array = new Uint8Array([
    /* FOURCC*/ 0x41, 0x55, 0x44, 0x41, 
    /* VERSION NUMBER */ 0x01, 0x00, 0x00, 0x00,
    /* SIZE OF WHOLE ARRAY */ 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* INDEX COUNT */ 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,

    /* KEY TYPE */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #1 */ 0x58, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #2 */ 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* ADDRESS OF INDEX #3 */ 0x88, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #4 */ 0xA0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #5 */ 0xB8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* ADDRESS OF INDEX #6 */ 0xD0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF INDEX #7 */ 0xE8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #1 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #1 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #1 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #2 */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #2 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #2 */0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #3 */  0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #3 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #3 */0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #4 */ 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #4 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #4 */0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #5 */ 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #5 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #5 */0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #6 */ 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #6 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #6 */0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #7 */ 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* VALUE TYPE ID #7 */ 0x03, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
    /* ACTUAL VALUE #7 */0xFF, 0xFF, 0xFF, 0x7F, 0x00, 0x00, 0x00, 0x00
  ]);

  const entryDefinitionsOffset: bigint = BigInt(Definitions.entryDefinitionsOffset);

  const expected: Int32Array = new Int32Array ( [0, 1, 10, 100, 255, 16777216, 2147483647] );

  // Act
  const isAUDALF: boolean = AUDALF_Deserialize.IsAUDALF(inputArray);
  const versionNumber:number = AUDALF_Deserialize.GetVersionNumber(inputArray);
  const byteSize: bigint = AUDALF_Deserialize.GetByteSize(inputArray);
  const isDictionary: boolean = AUDALF_Deserialize.IsDictionary(inputArray);
  const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(inputArray);
  const entryDefinitionOffsets: bigint[] = AUDALF_Deserialize.GetEntryDefinitionOffsets(inputArray);
  const sameTypes: [boolean, Uint8Array | null] = AUDALF_Deserialize.CheckIfAllListEntryDefinitionsHaveSameValueTypes(inputArray, entryDefinitionOffsets);
  const intArray: Int32Array = AUDALF_Deserialize.Deserialize(inputArray);

  // Assert
  assertEquals(isAUDALF, true, "Result should be AUDALF payload");
  assertEquals(versionNumber, new DataView(Definitions.versionNumber.buffer, 0, 4).getUint32(0, /* littleEndian */ true), "Result should have correct version number");
  assertEquals(isDictionary, false, "Result should contain an array, not a dictionary");
  assertEquals(indexCount, BigInt(entryDefinitionOffsets.length), "Result should have certain number of entry definitions");
  assertEquals(sameTypes[0], true, "All elements should have same type");
  assertEquals(intArray, expected, "Arrays should match");

  for (const u of entryDefinitionOffsets)
  {
    assert(u > entryDefinitionsOffset, "Each entry definition should point to valid address inside the payload");
    assert(u < byteSize, "Each entry definition should point to valid address inside the payload");
    assertEquals(u % 8n === 0n, true, "Every offset should align to 8 bytes (64 bits)");
  }
});

Deno.test("Deserialize AUDALF bytes to string-string dictionary", () => {
  // Arrange
  const inputArray: Uint8Array = new Uint8Array([
    /* FOURCC*/ 0x41, 0x55, 0x44, 0x41, 
    /* VERSION NUMBER */ 0x01, 0x00, 0x00, 0x00,
    /* SIZE OF WHOLE ARRAY */ 0xA8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* INDEX COUNT */  0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,

    /* KEY TYPE */ 0x02, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF KEY #1 */ 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* ADDRESS OF KEY #2 */ 0x60, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* ADDRESS OF KEY #3 */ 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    
    /* KEY #1 length */ 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* KEY #1 content */ 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,

    /* VALUE TYPE ID #1 */ 0x02, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE #1 length */ 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE #1 content */ 0x69, 0x73, 0x20, 0x6F, 0x6E, 0x65, 0x00, 0x00,

    /* KEY #2 length */  0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* KEY #2 content */ 0x73, 0x65, 0x63, 0x6F, 0x6E, 0x64, 0x00, 0x00, 
    
    /* VALUE TYPE ID #2 */ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    /* KEY #2 content */ 0x02, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 

    /* KEY #3 length */ 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* KEY #2 content */ 0x65, 0x6D, 0x6F, 0x6A, 0x69, 0x73, 0x00, 0x00,

    /* VALUE TYPE ID #3  */ 0x02, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE #3 length */ 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    /* VALUE #3 content */ 0xF0, 0x9F, 0x90, 0xB6, 0xF0, 0x9F, 0x8D, 0xA6
  ]);

  const entryDefinitionsOffset: bigint = BigInt(Definitions.entryDefinitionsOffset);

  const expected = { 1: 'is one', second: null, emojis: '🐶🍦' };

  // Act
  const isAUDALF: boolean = AUDALF_Deserialize.IsAUDALF(inputArray);
  const versionNumber:number = AUDALF_Deserialize.GetVersionNumber(inputArray);
  const byteSize: bigint = AUDALF_Deserialize.GetByteSize(inputArray);
  const isDictionary: boolean = AUDALF_Deserialize.IsDictionary(inputArray);
  const indexCount: bigint = AUDALF_Deserialize.GetIndexCount(inputArray);
  const entryDefinitionOffsets: bigint[] = AUDALF_Deserialize.GetEntryDefinitionOffsets(inputArray);
  //const sameTypes: [boolean, Uint8Array | null] = AUDALF_Deserialize.CheckIfAllEntryDefinitionsHaveSameTypes(inputArray, entryDefinitionOffsets);
  const newObject = AUDALF_Deserialize.Deserialize(inputArray);

  // Assert
  assertEquals(isAUDALF, true, "Result should be AUDALF payload");
  assertEquals(versionNumber, new DataView(Definitions.versionNumber.buffer, 0, 4).getUint32(0, /* littleEndian */ true), "Result should have correct version number");
  assertEquals(isDictionary, true, "Result should contain a dictionary, not an array");
  assertEquals(indexCount, BigInt(entryDefinitionOffsets.length), "Result should have certain number of entry definitions");
  //assertEquals(sameTypes[0], true, "All elements should have same type");
  assertEquals(newObject, expected, "Objects should match");

  for (const u of entryDefinitionOffsets)
  {
    assert(u > entryDefinitionsOffset, "Each entry definition should point to valid address inside the payload");
    assert(u < byteSize, "Each entry definition should point to valid address inside the payload");
    assertEquals(u % 8n === 0n, true, "Every offset should align to 8 bytes (64 bits)");
  }
});