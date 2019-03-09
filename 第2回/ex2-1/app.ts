///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    private cube: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;

    private view: String;
    private ax: number;
    private ay: number;
    private az: number;
    private crview: String;
    private csx: number;
    private csy: number;
    private csz: number;

    private lineX: THREE.LineSegments;
    private lineY: THREE.LineSegments;
    private lineZ: THREE.LineSegments;
    private linegeometryX: THREE.Geometry;
    private linegeometryY: THREE.Geometry;
    private linegeometryZ: THREE.Geometry;
    private linematerial: THREE.LineBasicMaterial;

    constructor(view, ax, ay, az) {
        this.createRenderer(view);
        this.createScene(ax, ay, az);
    }

    private createRenderer(crview) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0x495ed));

        var viewelement = document.getElementById(crview);
        var elmsize = viewelement.getBoundingClientRect();
        this.screenWidth = elmsize.width;
        this.screenHeight = elmsize.height;
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        viewelement.appendChild(this.renderer.domElement);
    }

    private createScene(ax, ay, az) {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = ax;
        this.camera.position.y = ay;
        this.camera.position.z = az;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        this.linegeometryX = new THREE.Geometry();
        this.linegeometryX.vertices.push(
            new THREE.Vector3(3, 0, 0),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.lineX = new THREE.LineSegments(this.linegeometryX, this.linematerial);
        this.scene.add(this.lineX);

        this.linegeometryY = new THREE.Geometry();
        this.linegeometryY.vertices.push(
            new THREE.Vector3(0, 3, 0),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        this.lineY = new THREE.LineSegments(this.linegeometryY, this.linematerial);
        this.scene.add(this.lineY);

        this.linegeometryZ = new THREE.Geometry();
        this.linegeometryZ.vertices.push(
            new THREE.Vector3(0, 0, 3),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.lineZ = new THREE.LineSegments(this.linegeometryZ, this.linematerial);
        this.scene.add(this.lineZ);
    }

    public render() {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}

document.addEventListener("DOMContentLoaded", function () {
    var threeJSTestFree = new ThreeJSTest("viewportFree", 3, 3, 3);
    threeJSTestFree.render();
    var threeJSTestX = new ThreeJSTest("viewportX", 3, 0, 0);
    threeJSTestX.render();
    var threeJSTestY = new ThreeJSTest("viewportY", 0, 3, 0);
    threeJSTestY.render();
    var threeJSTestZ = new ThreeJSTest("viewportZ", 0, 0, 3);
    threeJSTestZ.render();
});