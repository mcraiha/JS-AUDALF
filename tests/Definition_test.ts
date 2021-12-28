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
