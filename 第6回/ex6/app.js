///<reference path="./node_modules/@types/three/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.rotAngle = 0;
        this.rotRadius = 0;
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
        this.renderer.setClearColor(new THREE.Color(0x000000));
        this.scene = new THREE.Scene();
        this.flares = new Array();
        //this.torus = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.torus);
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
    }
    render() {
        //this.torus.rotation.x += 0.01;
        this.rotAngle += 0.03;
        this.rotRadius = 3;
        //console.debug(this.rotAngle);
        this.addFlare(new THREE.Vector3(Math.cos(this.rotAngle) * this.rotRadius, 0, Math.sin(this.rotAngle) * this.rotRadius));
        this.updateFlares();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    addFlare(pos) {
        //console.debug(pos);
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load("fire.png");
        this.material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        this.geometry = new THREE.PlaneGeometry(3, 3);
        var plane = new THREE.Mesh(this.geometry, this.material);
        plane.lookAt(this.camera.position); //板をカメラの方に向けておく
        plane.position.set(pos.x, 0, pos.z);
        this.flares.unshift(plane);
        this.scene.add(plane);
        //console.debug(this.flares[0].position);
    }
    updateFlares() {
        for (var i = 0; i < this.flares.length; i++) {
            var s = 1 - 0.01 * i;
            this.flares[i].scale.set(s, s, s);
            //i番目の板のscaleを小さくする
            if (s <= 0) {
                this.scene.remove(this.flares[i]);
                this.flares.slice(i, 1);
            }
            //もしscaleが0以下なら
            //flares配列のi番目の板をシーンから消す
            //配列からも消す
        }
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map