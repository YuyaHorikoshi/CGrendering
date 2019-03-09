class Triangle implements BaseShape {
    private mverticies: THREE.Vector3[];
    get verticies(): THREE.Vector3[] {
        return this.mverticies;
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
 
    private mnormal: THREE.Vector3;
    get normal(): THREE.Vector3{
        return this.mnormal;
    }
 
    constructor(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, color: THREE.Color, ia: number, id: number, is: number, n: number)
    {
        this.mverticies = new Array();
        this.mverticies[0] = new THREE.Vector3().copy(p0);
        this.mverticies[1] = new THREE.Vector3().copy(p1);
        this.mverticies[2] = new THREE.Vector3().copy(p2);
        this.mcolor = new THREE.Color;
        this.mcolor.copy(color);
        this.mka = ia;
        this.mkd = id;
        this.mks = is;
        this.mn = n;
 
        //法線を計算，時計回りを表面とする
        var v1 = new THREE.Vector3().subVectors(this.verticies[2], this.verticies[0]);
        var v2 = new THREE.Vector3().subVectors(this.verticies[1], this.verticies[0]);
        this.mnormal = new THREE.Vector3().crossVectors(v1, v2).normalize();
    }

    calcT(e: THREE.Vector3, v: THREE.Vector3): number {
        //今回の課題  
        var de = 0;
        var nu = 0;
        var t = 0;
        var e0 = new THREE.Vector3;
        var e1 = new THREE.Vector3;
        var e2 = new THREE.Vector3;
        var i = new THREE.Vector3;
        var iv0 = new THREE.Vector3;
        var iv1 = new THREE.Vector3;
        var iv2 = new THREE.Vector3;
        var cross0 = new THREE.Vector3;
        var cross1 = new THREE.Vector3;
        var cross2 = new THREE.Vector3;


        de = this.normal.clone().dot(v.clone());
        nu = this.normal.clone().dot(this.verticies[0].clone().sub(e.clone()));
        
        if (Math.abs(de) < 0.000001) {
            return -1;
        }
        t = nu / de;

        e0 = this.verticies[1].clone().sub(this.verticies[0].clone());
        e1 = this.verticies[2].clone().sub(this.verticies[1].clone());
        e2 = this.verticies[0].clone().sub(this.verticies[2].clone());

        i = e.clone().add(v.clone().multiplyScalar(t));

        iv0 = i.clone().sub(this.verticies[0].clone());
        iv1 = i.clone().sub(this.verticies[1].clone());
        iv2 = i.clone().sub(this.verticies[2].clone());

        cross0 = iv0.clone().cross(e0.clone());
        cross1 = iv1.clone().cross(e1.clone());
        cross2 = iv2.clone().cross(e2.clone());

        if ((cross0.dot(this.normal)>0) && (cross1.dot(this.normal)>0) && (cross2.dot(this.normal) > 0)) {
            return t;
        } else {
            return -1;
        }
    }

    calcNorm(p: THREE.Vector3): THREE.Vector3 {
        return this.normal.clone();
    } 2
    calcShading(q: PointLight, p: THREE.Vector3, e: THREE.Vector3,v:THREE.Vector3,numdepth:number,scene:RTScene): THREE.Color {
        //第10回課題
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
        var objcolor;
        var refcolor;
        var R=new THREE.Vector3();

        pq = q.position.clone().sub(p.clone());
        var r = pq.length();
        L = pq.clone().multiplyScalar(1 / r);

        N = this.calcNorm(p);

        pe = e.clone().sub(p.clone());
        //var v_r = pe.length();
        V = pe.clone().normalize();

        ia = this.ka;

        var dot = N.clone().dot(pq.clone());
        if (dot <= 0) {
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
        objcolor=new THREE.Color(pR,pG,pB);
        if(numdepth<scene.MAXDEPTH){
            R=v.clone().add(N.clone().multiplyScalar(2*N.clone().dot(v.clone().multiplyScalar(-1))))
            refcolor=new THREE.Color(scene.shootRay(p.clone().add(N.clone().addScalar(0.00001)),R,numdepth+1));
            objcolor=objcolor.multiplyScalar(0.5).add(refcolor.multiplyScalar(0.5));
            return objcolor;
        }else{
        return objcolor;
        }
    }

}