import { Vector2 } from "@/math";
import { Drawer } from "./drawer";

export class Circle extends Drawer {
	constructor(origin: Vector2, radius: number, color: string) {
		super();

		Drawer.ctx.beginPath();
		Drawer.ctx.arc(origin.x, origin.y * -1, radius, 0, 2 * Math.PI);
		Drawer.ctx.strokeStyle = color;
		Drawer.ctx.fillStyle = color;
		Drawer.ctx.fill();
		Drawer.ctx.stroke();
		Drawer.ctx.closePath();
	}
}
