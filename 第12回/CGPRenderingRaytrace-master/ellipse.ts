class Ellipse implements BaseShape {
    private mpositioin: THREE.Vector3;
    get position(): THREE.Vector3 {
        return this.mpositioin;
    }
 
    private msize: THREE.Vector3;
    get size(): THREE.Vector3{
        return this.msize;
    }
 
    private mcolor: THREE.Color;
    get color(): THREE.Color {
        return this.mcolor;
    }
 
    private mka: number;
    get ka(): number {
        return this.mka;
    }
 
    private mkd: number;
    get kd(): number {
        return this.mkd;
    }
 
    private mks: number;
    get ks(): number {
        return this.mks;
    }
 
    private mn: number;
    get n(): number {
        return this.mn;
    }
 
    constructor(position: THREE.Vector3, size: THREE.Vector3, color: THREE.Color, ia: number, id: number, is: number, n: number)
    {
        this.mpositioin = new THREE.Vector3();
        this.mpositioin.copy(position);
        this.msize = new THREE.Vector3();
        this.msize.copy(size);
        this.mcolor = new THREE.Color;
        this.mcolor.copy(color);
        this.mka = ia;
        this.mkd = id;
        this.mks = is;
        this.mn = n;
    }
 
    calcNorm(p: THREE.Vector3): THREE.Vector3 {
        var mscale = new THREE.Matrix4().scale(new THREE.Vector3(1 / (this.size.x * this.size.x), 1 / (this.size.y * this.size.y), 1 / (this.size.z * this.size.z)));
        var postop = p.clone().sub(this.position);
        return postop.clone().applyMatrix4(mscale).normalize();
    }
 
 

    calcT(e: THREE.Vector3, v: THREE.Vector3): number {
        var alpha, beta, gamma; //連立方程式から得られたtに関する二次方程式の係数 
        var D; //判別式 
        var K = 1; //二次形式⇒1は楕円面を表す 
        var M = new THREE.Matrix4(); //4行4列の係数行列 
        var R0d = new THREE.Vector3(); //R0'

        R0d.subVectors(e, this.position);;

        M = new THREE.Matrix4().scale(new THREE.Vector3(1 / Math.pow(this.size.x, 2), 1 / Math.pow(this.size.y, 2), 1 / Math.pow(this.size.z, 2)));

        alpha = v.dot(v.clone().applyMatrix4(M.clone()));

        beta = R0d.dot(v.clone().applyMatrix4(M.clone()));

        gamma = R0d.dot(R0d.clone().applyMatrix4(M.clone())) - K;

        D = beta * beta - alpha * gamma;
        if (D < 0) { return -1; }
        else { return (-beta - Math.sqrt(D)) / alpha; }
    }

    calcShading(q: PointLight, p: THREE.Vector3, e: THREE.Vector3): THREE.Color {
        //q:点光源，q.position:点光源の位置，q.position.ii:光強度
        //p:光線とこの楕円のとの交点位置
        //e:視点（カメラ）位置
        //課題はここを実装
        //最終的に交点位置における色（THREE.Color）を返す
        //以下はこの楕円の色を返す仮のコード
        var pq = new THREE.Vector3();
        var pe = new THREE.Vector3();
        var L = new THREE.Vector3();
        var V = new THREE.Vector3();
        var N = new THREE.Vector3();
        var R = new THREE.Vector3();
        var ia, id, is;

        pq = q.position.clone().sub(p.clone());
        var r = pq.length();
        L = pq.clone().multiplyScalar(1 / r);

        N = this.calcNorm(p);

        pe = e.clone().sub(p.clone());
        //var v_r = pe.length();
        V = pe.clone().normalize();

        ia = this.ka;

        var dot=N.clone().dot(pq.clone());
        if (dot<=0) {
            id = 0;
            is = 0;
        } else {
            id = (this.kd * q.ii / Math.pow(r, 2)) * N.clone().dot(L.clone());
            R = N.clone().multiplyScalar(2 * (N.clone().dot(L.clone()))).sub(L.clone());
            is = (this.ks * q.ii / Math.pow(r, 2)) * Math.pow((R.clone().dot(V.clone())), this.n);
        }
        var pR = this.color.r * ia + this.color.r * id + 255 * is;
        var pG = this.color.g * ia + this.color.g * id + 255 * is;
        var pB = this.color.b * ia + this.color.b * id + 255 * is;
        return new THREE.Color(pR, pG, pB);
    }

}