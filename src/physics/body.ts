import { Vector2 } from "@/math";
import { Shape } from './shape';
import { BoxShape } from './box-shape';

export class Body<TShape extends Shape = Shape> {
	private _isStatic: boolean;

	private _shape: TShape;

	private _position: Vector2;

	private _velocity = new Vector2(0, 0);

	private _acceleration = new Vector2(0, 0);

	private _mass: number;

	private _inverseMass: number;

	private _sumOfForces = Vector2.zero;

	private _rotation: number;

	private _angularVelocity = 0;

	private _angularAcceleration = 0;

	private _momentOfInertia: number;

	private _sumOfTorques = 0;

	private _restitution: number;

	constructor(shape: TShape, position = Vector2.zero, rotation = 0, mass = 1, restitution = 1) {
		this._shape = shape;
		this._position = position;
		this._rotation = rotation;
		this._mass = mass;
		this._restitution = restitution;

		if (this._mass <= 0.001) {
			this._isStatic = true;
			this._inverseMass = 0;
		} else {
			this._isStatic = false;
			this._inverseMass = 1 / this._mass;
		}

		this._momentOfInertia = this._shape.GetMomentOfInertia(this._mass);
	}

	public get isStatic(): boolean {
		return this._isStatic;
	}

	public get shape(): TShape {
		return this._shape;
	}

	public get position(): Vector2 {
		return this._position;
	}

	public set position(position: Vector2) {
		this._position = position;
	}

	public get velocity(): Vector2 {
		return this._velocity;
	}

	public get mass(): number {
		return this._mass;
	}

	public get inverseMass(): number {
		return this._inverseMass;
	}

	public get acceleration(): Vector2 {
		return this._acceleration;
	}

	public get rotation(): number {
		return this._rotation;
	}

	public get restitution(): number {
		return this._restitution;
	}

	public ApplyImpulse(impulse: Vector2): void {
		/**
		 * Impulse is an instantaneous change in velocity.
		 *
		 * Momentum (mass in motion) is the product of mass and velocity. Higher momentum means more difficult to change velocity.
		 *
		 * P = m * v
		 *
		 * Notation:
		 * - P = momentum
		 * - m = mass
		 * - v = velocity
		 *
		 * Impulse is the change in momentum.
		 *
		 * J = deltaP = m * deltaV
		 *
		 * Notation:
		 * - J = impulse
		 * - deltaP = change in momentum
		 * - m = mass
		 * - deltaV = change in velocity
		 *
		 * The deltaV is the impulse divided by the mass.
		 *
		 * deltaV = J / m or deltaV = J * invM
		 *
		 * Notation:
		 * - deltaV = change in velocity
		 * - J = impulse
		 * - m = mass
		 * - invM = inverse mass
		 */

		if (this._isStatic) return;

		this._velocity = Vector2.Add(this._velocity, Vector2.MultiplyScalar(impulse, this._inverseMass));
	}

	public AddForce(force: Vector2): void {
		this._sumOfForces.Add(force);
	}

	public AddTorque(torque: number): void {
		this._sumOfTorques += torque;
	}

	public IntegrateLinear(dt: number): void {
		// Find the acceleration from the sum of forces and mass | a = F / m
		if (this._isStatic) return;

		this._acceleration = Vector2.MultiplyScalar(this._sumOfForces, this._inverseMass);

		// Euler Method - Integrate the acceleration to find new velocity in the next frame | v = v0 + a * dt
		this._velocity.Add(Vector2.MultiplyScalar(this._acceleration, dt));

		// Euler Method - Integrate the velocity to find new position in the next frame | p = p0 + v * dt
		this._position.Add(Vector2.MultiplyScalar(this._velocity, dt));

		// Clear all forces for the next frame
		this._ClearForces();
	}

	public IntegrateAngular(dt: number): void {
		// Find the angular acceleration from the sum of torques and moment of inertia | alpha = T / I
		if (this._isStatic) return;

		this._angularAcceleration = this._sumOfTorques / this._momentOfInertia;

		// Euler Method - Integrate the angular acceleration to find new angular velocity in the next frame | omega = omega0 + alpha * dt
		this._angularVelocity += this._angularAcceleration * dt;

		// Euler Method - Integrate the angular velocity to find new rotation in the next frame | theta = theta0 + omega * dt
		this._rotation += this._angularVelocity * dt;

		// Clear all torques for the next frame
		this._ClearTorques();
	}

	public Update(dt: number): void {
		this.IntegrateLinear(dt);
		this.IntegrateAngular(dt);

		if (this._shape instanceof BoxShape) {
			this._shape.UpdateVertices(this._position, this._rotation) ;
		}
	}

	private _ClearForces(): void {
		this._sumOfForces = Vector2.zero;
	}

	private _ClearTorques(): void {
		this._sumOfTorques = 0;
	}
}
