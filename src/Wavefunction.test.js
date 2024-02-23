import { expect, test } from "vitest";
import Wavefunction from "./Wavefunction";


test("Wavefunction construction", () => {
    const wavefunction = new Wavefunction(9);

    // are there 9 possibilities per cell?
    const totalPossibilityLength = wavefunction.cells.reduce((acc, v) => acc + v.possibilities.length, 0);
    expect(totalPossibilityLength).toBe(9*9*9);

    // are none of the cells collapsed?
    const numCollapsed = wavefunction.cells.reduce((acc, v) => v.collapsed ? acc + 1 : acc, 0);
    expect(numCollapsed).toBe(0);

    // basic helper functions
    expect(wavefunction.isFinished()).toBe(false);
    expect(wavefunction.getMinEntropy()).toBe(9);
});


test("Cell collapsing", () => {
    const wavefunction = new Wavefunction(9);

    // does it actually collapse?
    wavefunction.collapseTo(13, 5);
    expect(wavefunction.cells[13].collapsed).toBe(true);
    expect(wavefunction.cells[13].possibilities).toStrictEqual([5]);


    // does it affect other cells?
    expect(wavefunction.cells[14].possibilities).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9]);
    expect(wavefunction.getMinEntropy()).toBe(8);
});


test("Wavefunction solving", () => {
    const wavefunction = new Wavefunction(9);
    wavefunction.solve();

    // is there only 1 possibility per cell?
    const totalPossibilityLength = wavefunction.cells.reduce((acc, v) => acc + v.possibilities.length, 0);
    expect(totalPossibilityLength).toBe(9*9);

    // are all cells in collapsed state?
    const numCollapsed = wavefunction.cells.reduce((acc, v) => v.collapsed ? acc + 1 : acc, 0);
    expect(numCollapsed).toBe(9*9)
});
