import { assert, assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { AUDALF_Definitions as Definitions } from "../src/AUDALF_Definitions.ts";

Deno.test("ByteArrayCompare equal tests", () => {
    // Arrange
    const array1: Uint8Array = new Uint8Array([0, 1, 100, 30, 12, 255]);
    const array2: Uint8Array = new Uint8Array([0, 1, 100, 30, 12, 255]);

    // Act
    const shouldBeTrue12 = Definitions.ByteArrayCompare(array1, array2);
    const shouldBeTrue11 = Definitions.ByteArrayCompare(array1, array1);
    const shouldBeTrue22 = Definitions.ByteArrayCompare(array2, array2);

    // Assert
    assertEquals(shouldBeTrue12, true, "Array1 and array2 should be equal");
    assertEquals(shouldBeTrue11, true, "Array1 and array1 should be equal");
    assertEquals(shouldBeTrue22, true, "Array2 and array2 should be equal");
});

Deno.test("ByteArrayCompare not equal tests", () => {
    // Arrange
    const array1: Uint8Array = new Uint8Array([0, 1, 100, 30, 12, 255]);
    const array2: Uint8Array = new Uint8Array([0, 1, 100, 30, 12, 250]);
    const array3: Uint8Array = new Uint8Array([0, 1, 100, 30, 12]);

    // Act
    const shouldBeFalse1 = Definitions.ByteArrayCompare(array1, array2);
    const shouldBeFalse2 = Definitions.ByteArrayCompare(array1, array3);
    const shouldBeFalse3 = Definitions.ByteArrayCompare(array2, array3);

    // Assert
    assertEquals(shouldBeFalse1, false, "Array1 and array2 should not be equal");
    assertEquals(shouldBeFalse2, false, "Array1 and array3 should not be equal");
    assertEquals(shouldBeFalse3, false, "Array2 and array3 should not be equal");
});

// FourCCTest
Deno.test("Test that we have proper FourCC", () => {
    // Arrange
    const fourCC: string = "AUDA";
    const expected: Uint8Array = new TextEncoder().encode(fourCC);

    // Act

    // Assert
    assertEquals(Definitions.ByteArrayCompare(expected, Definitions.fourCC), true, "FourCC should match");
});

// SpecialTypeTest
Deno.test("Test that we have proper special type", () => {
    // Arrange
    const valueGotFromBytes: BigInt = new DataView(Definitions.specialType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Act

    // Assert
    assertEquals(valueGotFromBytes, 0n, "Special type should equal 0");
});

// UnsignedIntegersTest
Deno.test("Test that unsigned integer types have right values", () => {
    // Arrange
    const expected8bit: BigInt = 1n;
	const expected16bit: BigInt = 2n;
	const expected32bit: BigInt = 3n;
	const expected64bit: BigInt = 4n;
	const expected128bit: BigInt = 5n;
	const expected256bit: BigInt = 6n;
	const expected512bit: BigInt = 7n;
	const expected1024bit: BigInt = 8n;
	const expected2048bit: BigInt = 9n;
	const expected4096bit: BigInt = 10n;

    // Act
    const result8bit: BigInt = new DataView(Definitions.unsigned_8_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result16bit: BigInt = new DataView(Definitions.unsigned_16_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result32bit: BigInt = new DataView(Definitions.unsigned_32_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result64bit: BigInt = new DataView(Definitions.unsigned_64_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result128bit: BigInt = new DataView(Definitions.unsigned_128_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result256bit: BigInt = new DataView(Definitions.unsigned_256_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result512bit: BigInt = new DataView(Definitions.unsigned_512_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result1024bit: BigInt = new DataView(Definitions.unsigned_1024_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result2048bit: BigInt = new DataView(Definitions.unsigned_2048_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result4096bit: BigInt = new DataView(Definitions.unsigned_4096_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(result8bit, expected8bit);
    assertEquals(result16bit, expected16bit);
    assertEquals(result32bit, expected32bit);
    assertEquals(result64bit, expected64bit);
    assertEquals(result128bit, expected128bit);
    assertEquals(result256bit, expected256bit);
    assertEquals(result512bit, expected512bit);
    assertEquals(result1024bit, expected1024bit);
    assertEquals(result2048bit, expected2048bit);
    assertEquals(result4096bit, expected4096bit);
});

// UnsignedIntegerArraysTest
Deno.test("Test that unsigned integer array types have right values", () => {
    // Arrange
    const expected8bit: BigInt = 65537n;
	const expected16bit: BigInt = 65538n;
	const expected32bit: BigInt = 65539n;
	const expected64bit: BigInt = 65540n;
	const expected128bit: BigInt = 65541n;
	const expected256bit: BigInt = 65542n;
	const expected512bit: BigInt = 65543n;
	const expected1024bit: BigInt = 65544n;
	const expected2048bit: BigInt = 65545n;
	const expected4096bit: BigInt = 65546n;

    // Act
    const result8bit: BigInt = new DataView(Definitions.unsigned_8_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result16bit: BigInt = new DataView(Definitions.unsigned_16_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result32bit: BigInt = new DataView(Definitions.unsigned_32_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result64bit: BigInt = new DataView(Definitions.unsigned_64_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result128bit: BigInt = new DataView(Definitions.unsigned_128_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result256bit: BigInt = new DataView(Definitions.unsigned_256_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result512bit: BigInt = new DataView(Definitions.unsigned_512_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result1024bit: BigInt = new DataView(Definitions.unsigned_1024_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result2048bit: BigInt = new DataView(Definitions.unsigned_2048_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result4096bit: BigInt = new DataView(Definitions.unsigned_4096_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(result8bit, expected8bit);
    assertEquals(result16bit, expected16bit);
    assertEquals(result32bit, expected32bit);
    assertEquals(result64bit, expected64bit);
    assertEquals(result128bit, expected128bit);
    assertEquals(result256bit, expected256bit);
    assertEquals(result512bit, expected512bit);
    assertEquals(result1024bit, expected1024bit);
    assertEquals(result2048bit, expected2048bit);
    assertEquals(result4096bit, expected4096bit);
});

// SignedIntegersTest
Deno.test("Test that signed integer types have right values", () => {
    // Arrange
    const expected8bit: BigInt = 16777217n;
	const expected16bit: BigInt = 16777218n;
	const expected32bit: BigInt = 16777219n;
	const expected64bit: BigInt = 16777220n;
	const expected128bit: BigInt = 16777221n;
	const expected256bit: BigInt = 16777222n;
	const expected512bit: BigInt = 16777223n;
	const expected1024bit: BigInt = 16777224n;
	const expected2048bit: BigInt = 16777225n;
	const expected4096bit: BigInt = 16777226n;

    // Act
    const result8bit: BigInt = new DataView(Definitions.signed_8_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result16bit: BigInt = new DataView(Definitions.signed_16_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result32bit: BigInt = new DataView(Definitions.signed_32_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result64bit: BigInt = new DataView(Definitions.signed_64_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result128bit: BigInt = new DataView(Definitions.signed_128_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result256bit: BigInt = new DataView(Definitions.signed_256_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result512bit: BigInt = new DataView(Definitions.signed_512_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result1024bit: BigInt = new DataView(Definitions.signed_1024_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result2048bit: BigInt = new DataView(Definitions.signed_2048_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result4096bit: BigInt = new DataView(Definitions.signed_4096_bit_integerType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(result8bit, expected8bit);
    assertEquals(result16bit, expected16bit);
    assertEquals(result32bit, expected32bit);
    assertEquals(result64bit, expected64bit);
    assertEquals(result128bit, expected128bit);
    assertEquals(result256bit, expected256bit);
    assertEquals(result512bit, expected512bit);
    assertEquals(result1024bit, expected1024bit);
    assertEquals(result2048bit, expected2048bit);
    assertEquals(result4096bit, expected4096bit);
});

// SignedIntegerArraysTest
Deno.test("Test that signed integer array types have right values", () => {
    // Arrange
    const expected8bit: BigInt = 16842753n;
	const expected16bit: BigInt = 16842754n;
	const expected32bit: BigInt = 16842755n;
	const expected64bit: BigInt = 16842756n;
	const expected128bit: BigInt = 16842757n;
	const expected256bit: BigInt = 16842758n;
	const expected512bit: BigInt = 16842759n;
	const expected1024bit: BigInt = 16842760n;
	const expected2048bit: BigInt = 16842761n;
	const expected4096bit: BigInt = 16842762n;

    // Act
    const result8bit: BigInt = new DataView(Definitions.signed_8_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result16bit: BigInt = new DataView(Definitions.signed_16_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result32bit: BigInt = new DataView(Definitions.signed_32_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result64bit: BigInt = new DataView(Definitions.signed_64_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result128bit: BigInt = new DataView(Definitions.signed_128_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result256bit: BigInt = new DataView(Definitions.signed_256_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result512bit: BigInt = new DataView(Definitions.signed_512_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result1024bit: BigInt = new DataView(Definitions.signed_1024_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result2048bit: BigInt = new DataView(Definitions.signed_2048_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result4096bit: BigInt = new DataView(Definitions.signed_4096_bit_integerArrayType.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(result8bit, expected8bit);
    assertEquals(result16bit, expected16bit);
    assertEquals(result32bit, expected32bit);
    assertEquals(result64bit, expected64bit);
    assertEquals(result128bit, expected128bit);
    assertEquals(result256bit, expected256bit);
    assertEquals(result512bit, expected512bit);
    assertEquals(result1024bit, expected1024bit);
    assertEquals(result2048bit, expected2048bit);
    assertEquals(result4096bit, expected4096bit);
});

// FloatingPointsTest
Deno.test("Test that float types have right values", () => {
    // Arrange
    const expected8bit: BigInt = 33554433n;
	const expected16bit: BigInt = 33554434n;
	const expected32bit: BigInt = 33554435n;
	const expected64bit: BigInt = 33554436n;
	const expected128bit: BigInt = 33554437n;
	const expected256bit: BigInt = 33554438n;
	const expected512bit: BigInt = 33554439n;

    // Act
    const result8bit: BigInt = new DataView(Definitions.floating_point_8_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result16bit: BigInt = new DataView(Definitions.floating_point_16_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result32bit: BigInt = new DataView(Definitions.floating_point_32_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result64bit: BigInt = new DataView(Definitions.floating_point_64_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result128bit: BigInt = new DataView(Definitions.floating_point_128_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result256bit: BigInt = new DataView(Definitions.floating_point_256_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const result512bit: BigInt = new DataView(Definitions.floating_point_512_bit.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(result8bit, expected8bit);
    assertEquals(result16bit, expected16bit);
    assertEquals(result32bit, expected32bit);
    assertEquals(result64bit, expected64bit);
    assertEquals(result128bit, expected128bit);
    assertEquals(result256bit, expected256bit);
    assertEquals(result512bit, expected512bit);
});

// StringsTest
Deno.test("Test that string types have right values", () => {
    // Arrange
    const expectedAscii: BigInt = 83886081n;
    const expectedUtf8: BigInt = 83886082n;
    const expectedUtf16: BigInt = 83886083n;
    const expectedUtf32: BigInt = 83886084n;

    // Act
    const resultAscii: BigInt = new DataView(Definitions.string_ascii.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const resultUtf8: BigInt = new DataView(Definitions.string_utf8.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const resultUtf16: BigInt = new DataView(Definitions.string_utf16.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);
    const resultUtf32: BigInt = new DataView(Definitions.string_utf32.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(resultAscii, expectedAscii);
    assertEquals(resultUtf8, expectedUtf8);
    assertEquals(resultUtf16, expectedUtf16);
    assertEquals(resultUtf32, expectedUtf32);
});

// BooleanTest
Deno.test("Test that boolean types have right values", () => {
    // Arrange
    const expectedBoolean: BigInt = 100663297n;

    // Act
    const resultBoolean: BigInt = new DataView(Definitions.booleans.buffer, 0, 8).getBigUint64(0, /* littleEndian */ true);

    // Assert
    assertEquals(resultBoolean, expectedBoolean);
});