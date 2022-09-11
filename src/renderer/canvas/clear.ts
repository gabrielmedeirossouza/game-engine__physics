import { Drawer } from "./drawer";

export class Clear extends Drawer {
	constructor() {
		super();

		Drawer.ctx.clearRect(
			-Drawer.canvas.width,
			-Drawer.canvas.height,
			Drawer.canvas.width * 2,
			Drawer.canvas.height * 2
		);
	}
}
