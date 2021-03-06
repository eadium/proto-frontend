import AMatrix from "./amatrix";
import Vector2 from "./vector2";
import Vector3 from "./vector3";

export default class Matrix3x3 extends AMatrix {
	public static One(): Matrix3x3 {
		const array: Array<number> = new Array<number>(
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		);

		return new Matrix3x3(array);
	}

	public static Empty(): Matrix3x3 {
		const array: Array<number> = (new Array(9)).fill(0);
		return new Matrix3x3(array);
	}

	public static Sum(matrix1: Matrix3x3, matrix2: Matrix3x3) {
		const res: Matrix3x3 = new Matrix3x3(matrix1._values);
		res.Add(matrix2);

		return res;
	}

	public static Difference(matrix1: Matrix3x3, matrix2: Matrix3x3) {
		const res: Matrix3x3 = new Matrix3x3(matrix1._values);
		res.Substract(matrix2);

		return res;
	}

	public static MultiplyToVector(matrix: Matrix3x3, vector: Vector3): Vector3 {
		const res: Matrix3x3 = new Matrix3x3(matrix._values);
		res.MultiplyToVector(vector);

		return new Vector3(res._values);
	}

	public static Multiply(m1: Matrix3x3, m2: Matrix3x3): Matrix3x3 {
		const res: Matrix3x3 = new Matrix3x3(m1._values);
		res.Multiply(m2);

		return res;
	}

	public static Transition(matrix: Matrix3x3, vec: Vector3): Matrix3x3 {
		const res: Matrix3x3 = new Matrix3x3(matrix._values);
		res.Transition(vec);

		return res;
	}

	public static Rotate(matrix: Matrix3x3, vec: Vector2) {
		const res: Matrix3x3 = new Matrix3x3(matrix._values);
		res.Rotate(vec);

		return res;
	}

	public static Scale(matrix: Matrix3x3, vec: Vector3): Matrix3x3 {
		const res: Matrix3x3 = new Matrix3x3(matrix._values);
		res.Scale(vec);

		return res;
	}
	constructor(array: Array<number>) {
		super(array, 3, 3);
	}

	public Add(matrix: Matrix3x3) {
		for (let i: number = 0; i < 9; i++) {
			this._values[i] += matrix._values[i];
		}
	}

	public Substract(matrix: Matrix3x3) {
		for (let i: number = 0; i < 9; i++) {
			this._values[i] -= matrix._values[i];
		}
	}

	public Multiply(matrix: Matrix3x3) {
		const newValues: Array<number> = new Array<number>(
			this._height * matrix.Width,
		);

		for (let i: number = 0; i < this._height; i++) {
			for (let j: number = 0; j < matrix.Width; j++) {
				const newValueIndex: number = this.CalcIndex(i, j);
				newValues[newValueIndex] = 0;

				for (let k: number = 0; k < matrix.Height; k++) {
					newValues[newValueIndex] += this.GetByIndex(i, k) * matrix.GetByIndex(k, j);
				}
			}
		}

		this._values = newValues;
	}

	// TODO: исправить этот костыль
	public MultiplyToVector(vec: Vector3) {
		const newValues: Array<number> = new Array<number>(
			this._height * vec.Width,
		);

		for (let i: number = 0; i < this._height; i++) {
			for (let j: number = 0; j < vec.Width; j++) {
				const newValueIndex: number = i;
				newValues[newValueIndex] = 0;

				for (let k: number = 0; k < vec.Height; k++) {
					newValues[newValueIndex] += this.GetByIndex(i, k) * vec.GetByIndex(k, j);
				}
			}
		}

		this._values = newValues;
	}

	public Transition(vec: Vector3) {
		// Это не магические числа, а оптимизация, чтобы не высчитвать их на каждой трансформации
		const newX: number =
			vec.X * this._values[0] + vec.Y * this._values[1] + this._values[2];
		const newY: number =
			vec.X * this._values[3] + vec.Y * this._values[4] + this._values[5];
		const newZ: number =
			vec.X * this._values[6] + vec.Y * this._values[7] + this._values[8];

		this._values[2] = newX;
		this._values[5] = newY;
		this._values[8] = newZ;
	}

	public Scale(vec: Vector3) {
		// Это не магические числа, а оптимизация, чтобы не высчитвать их на каждой трансформации
		this._values[0] *= vec.X;
		this._values[3] *= vec.X;
		this._values[6] *= vec.X;

		this._values[1] *= vec.Y;
		this._values[4] *= vec.Y;
		this._values[7] *= vec.Y;
	}

	// TODO: реализовать
	public Rotate(vec: Vector2) {}

	protected CalcIndex(row: number, column: number): number {
		const index: number = this._width * row + column;

		if (index >= this._height * this._width || index < 0) {
			throw new Error("Index out of range");
		}

		return index;
	}
}
