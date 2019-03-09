class Ellipse implements BaseShape {
    private mpositioin: THREE.Vector3;
    get position(): THREE.Vector3 {
        return this.mpositioin;
    }

    private msize: THREE.Vector3;
    get size(): THREE.Vector3 {
        return this.msize;
    }

    private mcolor: THREE.Color;
    get color(): THREE.Color {
        return this.mcolor;
    }

    private mia: number;
    get ia(): number {
        return this.mia;
    }

    private mid: number;
    get id(): number {
        return this.mid;
    }

    private mis: number;
    get is(): number {
        return this.mis;
    }

    private mn: number;
    get n(): number {
        return this.mn;
    }

    constructor(position: THREE.Vector3, size: THREE.Vector3, color: THREE.Color, ia: number, id: number, is: number, n: number) {
        this.mpositioin = new THREE.Vector3();
        this.mpositioin.copy(position);
        this.msize = new THREE.Vector3();
        this.msize.copy(size);
        this.mcolor = new THREE.Color;
        this.mcolor.copy(color);
        this.mia = ia;
        this.mid = id;
        this.mis = is;
        this.mn = n;
    }

    calcT(e: THREE.Vector3, v: THREE.Vector3): number {
        var alpha, beta, gamma; //連立方程式から得られたtに関する二次方程式の係数 
        var D; //判別式 
        var K = 1; //二次形式⇒1は楕円面を表す 
        var M = new THREE.Matrix4(); //4行4列の係数行列 
        var R0d = new THREE.Vector3(); //R0'

        var a=1/(this.size.x*this.size.x);
        var b=1/(this.size.y*this.size.y);
        var c=1/(this.size.z*this.size.z);

        R0d.subVectors(e, this.position);

        M = new THREE.Matrix4().scale(new THREE.Vector3(a,b,c));

        alpha = v.dot(v.clone().applyMatrix4(M));
        beta = R0d.clone().dot(v.clone().applyMatrix4(M));
        gamma = R0d.dot(R0d.clone().applyMatrix4(M)) - K;

        D = beta * beta - alpha * gamma;

        if (D < 0) { return -1; }
        else { return (-beta - Math.sqrt(D)) / alpha; }
    }

    calcNom(p: THREE.Vector3): THREE.Vector3 {
        var mscale = new THREE.Matrix4().scale(new THREE.Vector3(1 / (this.size.x * this.size.x), 1 / (this.size.y * this.size.y), 1 / (this.size.z * this.size.z)));
        var postop = p;
        postop.sub(this.position);
        return postop.applyMatrix4(mscale).normalize();
    }

    calcShading(q: PointLight, p: THREE.Vector3, e: THREE.Vector3): THREE.Color {
        return this.color;
    }

}
