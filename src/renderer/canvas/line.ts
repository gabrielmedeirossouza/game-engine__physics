import { Vector2 } from "@/math";
import { Drawer } from "./drawer";

export class Line extends Drawer {
	constructor(origin: Vector2, line: Vector2, color: string) {
		super();

		Drawer.ctx.beginPath();
		Drawer.ctx.moveTo(origin.x, origin.y * -1);
		Drawer.ctx.lineTo(origin.x + line.x, origin.y + line.y * -1);
		Drawer.ctx.strokeStyle = color;
		Drawer.ctx.stroke();
		Drawer.ctx.closePath();
	}
}
