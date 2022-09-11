import { Vector2 } from '@/math';
import { Body } from './body';

export class Force {
	public static GenerateDragForce(body: Body, k: number): Vector2 {
		/**
     * F = 1/2 * p * K * A * ||v||² * -v
     *
     * The (1/2 * p * K * A) can be replaced with a constant, to simplify the calculation of the force. e.g. k.
     *
     * F = C * ||v||² * -v
     *
     * Notation:
     *  - F: Force
     *  - p: density of the fluid
     *  - K: drag coefficient
     *  - A: cross-sectional area of the body
     *  - k: constant to: 1/2 * p * K * A
     *  - v: direction of velocity of the body (normalized)
    */
		let dragForce = Vector2.zero;

		if (body.velocity.magnitudeSquared > 0) {
			const dragDirection = body.velocity.normalized.MultiplyScalar(-1);

			const dragMagnitude = k * body.velocity.magnitudeSquared;

			dragForce = Vector2.MultiplyScalar(dragDirection, dragMagnitude);
		}

		return dragForce;
	}
}
