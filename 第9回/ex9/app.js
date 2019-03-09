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
        this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        var otherUniforms = { modelcolor: new THREE.Uniform(new THREE.Vector3(0, 1, 0)) };
        this.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib["lights"],
            otherUniforms
        ]);
        this.material = new THREE.ShaderMaterial({
            lights: true,
            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });
        this.mat2 = new THREE.ShaderMaterial({
            lights: true,
            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader2').textContent
        });
        this.torus = new THREE.Mesh(this.geometry, this.material);
        this.torus.position.y = 3;
        this.scene.add(this.torus);
        this.trous2 = new THREE.Mesh(this.geometry, this.mat2);
        this.trous2.position.y = -3;
        this.scene.add(this.trous2);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth / this.screenHeight, 0.1, 1000);
        this.camera.position.set(8, 0, 0);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(0, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    }
    render() {
        //this.torus.rotation.x += 0.01; 
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map