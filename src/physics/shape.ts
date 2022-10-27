export enum EShapeType {
  CIRCLE,
  POLYGON,
  BOX
}

export abstract class Shape {
	protected _type: EShapeType;

	constructor(type: EShapeType) {
		this._type = type;
	}

	public get getType(): EShapeType {
		return this._type;
	}

	public abstract GetMomentOfInertia(mass: number): number;
}
