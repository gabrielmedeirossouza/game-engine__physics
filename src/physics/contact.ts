import { Vector2 } from "@/math";
import { Body } from "./body";

export class Contact {
	public start = Vector2.zero;

	public end = Vector2.zero;

	public normal = Vector2.zero;

	public depth = 0;

	public bodyA: Body;

	public bodyB: Body;

	public ResolvePenetration(): void {
		/**
		 * The total inverse mass of the two bodies
		 *
		 * da = depth * mb / (ma + mb) or da = depth / (1 / ma + 1 / mb) * 1 / ma
		 *
		 * db = depth * ma / (ma + mb) or db = depth / (1 / ma + 1 / mb) * 1 / mb
		 *
		 * Notation:
		 * - ma: mass of body A
		 * - mb: mass of body B
		 * - da: depth of body A
		 * - db: depth of body B
		 * - depth: total depth of the two bodies
		 *
		 */

		if (this.bodyA.isStatic && this.bodyB.isStatic) return;

		const da = this.depth / (this.bodyA.inverseMass + this.bodyB.inverseMass) * this.bodyA.inverseMass;
		const db = this.depth / (this.bodyA.inverseMass + this.bodyB.inverseMass) * this.bodyB.inverseMass;

		this.bodyA.position = Vector2.Subtract(this.bodyA.position, Vector2.MultiplyScalar(this.normal, da));
		this.bodyB.position = Vector2.Add(this.bodyB.position, Vector2.MultiplyScalar(this.normal, db));
	}

	public ResolveCollision(): void {
		/**
		 * Jn = (-(1 + e) * (vRel * n)) / (1 / mA + 1 / mB)
		 *
		 * Notation:
		 * - Jn = normal impulse
		 * - e = coefficient of restitution
		 * - vRel = relative velocity
		 * - n = normal
		 * - mA = mass of body A
		 * - mB = mass of body B
		 */

		if (this.bodyA.isStatic && this.bodyB.isStatic) return;

		this.ResolvePenetration();

		const e = Math.min(this.bodyA.restitution, this.bodyB.restitution);

		// Relative velocity of the two bodies
		const relativeVelocity = Vector2.Subtract(this.bodyA.velocity, this.bodyB.velocity);

		// Calculate relative velocity in terms of the normal direction
		const relativeVelocityDotNormal = Vector2.Dot(relativeVelocity, this.normal);

		const impulseMagnitude = -(1 + e) * relativeVelocityDotNormal / (this.bodyA.inverseMass + this.bodyB.inverseMass);

		const impulse = Vector2.MultiplyScalar(this.normal, impulseMagnitude);

		this.bodyA.ApplyImpulse(impulse);
		this.bodyB.ApplyImpulse(Vector2.Negate(impulse));
	}
}
