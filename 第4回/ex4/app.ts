///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    private torus: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;

    private materials: { [key: string]: THREE.Material } = {};

    constructor() {
        this.createRenderer();
        this.createScene();
    }

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.torus = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.torus);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    }

    public render() {
        this.torus.rotation.x += 0.01;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

    public createMat(str: string) {
        if (str == "z" || str=="x" || str=="c" || str=="v" || str=="b") {
            this.scene.remove(this.torus);
            this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);

            this.materials["z"] = new THREE.MeshNormalMaterial();
            this.materials["x"] = new THREE.MeshLambertMaterial({color:0x00ffff});
            this.materials["c"] = new THREE.MeshPhongMaterial({color:0x00ffff});
            this.materials["v"] = new THREE.MeshPhongMaterial({color:0x00ffff, flatShading: true });
            this.materials["b"] = new THREE.MeshNormalMaterial({ wireframe: true });
            this.torus = new THREE.Mesh(this.geometry, this.materials[str]);
            this.scene.add(this.torus);
        }
    }

}

var threeJSTest: ThreeJSTest;

document.addEventListener("DOMContentLoaded", function () {
    threeJSTest = new ThreeJSTest();
    threeJSTest.render();
});

document.addEventListener("keypress", (e: KeyboardEvent) => {
    threeJSTest.createMat(e.key);
})