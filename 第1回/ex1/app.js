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
        this.linegeometryX = new THREE.Geometry();
        this.linegeometryX.vertices.push(new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 0));
        this.linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.lineX = new THREE.LineSegments(this.linegeometryX, this.linematerial);
        this.scene.add(this.lineX);
        this.linegeometryY = new THREE.Geometry();
        this.linegeometryY.vertices.push(new THREE.Vector3(0, 3, 0), new THREE.Vector3(0, 0, 0));
        this.linematerial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        this.lineY = new THREE.LineSegments(this.linegeometryY, this.linematerial);
        this.scene.add(this.lineY);
        this.linegeometryZ = new THREE.Geometry();
        this.linegeometryZ.vertices.push(new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, 0, 0));
        this.linematerial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.lineZ = new THREE.LineSegments(this.linegeometryZ, this.linematerial);
        this.scene.add(this.lineZ);
        this.a();
    }
    render() {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    a() {
        var M = new THREE.Matrix4(); //4行4列の係数行列 
        var x = 2;
        var y = 2;
        var z = 2;
        var a = 1 / (x * x);
        var e = new THREE.Vector3;
        var v = new THREE.Vector3(1, 2, 3);
        M.scale(new THREE.Vector3(1 / (x * x), 1 / (y * y), 1 / (z * z)));
        var i = v.clone().applyMatrix4(M);
        var q = v.clone().dot(v.clone().applyMatrix4(M));
        console.debug(i);
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map