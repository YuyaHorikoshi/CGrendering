///<reference path="./node_modules/@types/three/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
    }
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        var ar = this.screenWidth / this.screenHeight;
        this.camera = new THREE.OrthographicCamera(-5 * ar, 5 * ar, 5, -5, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.tiles();
    }
    render() {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    tiles() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.tileM1 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        this.tileM2 = new THREE.MeshLambertMaterial({ color: 0x0000ff });
        var count = 0;
        for (var i = -10; i < 10; i++) {
            for (var j = -5; j < 5; j++) {
                this.tile1 = new THREE.Mesh(this.geometry, this.tileM1);
                this.tile2 = new THREE.Mesh(this.geometry, this.tileM2);
                if (count % 2 == 0) {
                    this.tile1.position.x = 2 * j;
                    this.tile2.position.x = 1 + 2 * j;
                }
                else {
                    this.tile1.position.x = 1 + 2 * j;
                    this.tile2.position.x = 2 * j;
                }
                this.tile1.position.z = i;
                this.tile2.position.z = i;
                this.scene.add(this.tile1);
                this.scene.add(this.tile2);
            }
            count++;
        }
    }
    cameraPosDown() {
        var ar = this.screenWidth / this.screenHeight;
        var orthocam = this.camera;
        orthocam.left -= 1 * ar;
        orthocam.right += 1 * ar;
        orthocam.top += 1;
        orthocam.bottom -= 1;
        orthocam.updateProjectionMatrix();
    }
    cameraPosUp() {
        var ar = this.screenWidth / this.screenHeight;
        var orthocam = this.camera;
        orthocam.left += 1 * ar;
        orthocam.right -= 1 * ar;
        orthocam.top -= 1;
        orthocam.bottom += 1;
        orthocam.updateProjectionMatrix();
    }
}
var threeJSTest;
document.addEventListener("DOMContentLoaded", function () {
    threeJSTest = new ThreeJSTest();
    threeJSTest.render();
});
document.addEventListener("keypress", (e) => {
    if (e.key == "z") {
        this.cameraPos -= 1;
        threeJSTest.cameraPosDown();
    }
    if (e.key == "x") {
        this.cameraPos += 1;
        threeJSTest.cameraPosUp();
    }
});
//# sourceMappingURL=app.js.map