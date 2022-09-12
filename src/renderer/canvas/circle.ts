import { Vector2 } from "@/math";
import { Drawer } from "./drawer";

export class Circle extends Drawer {
	constructor(origin: Vector2, radius: number, color: string) {
		super();

		Drawer._ctx.beginPath();
		Drawer._ctx.arc(origin.x, origin.y * -1, radius, 0, 2 * Math.PI);
		Drawer._ctx.strokeStyle = color;
		Drawer._ctx.fillStyle = color;
		Drawer._ctx.fill();
		Drawer._ctx.stroke();
		Drawer._ctx.closePath();
	}
}
