interface BaseShape
{
    calcT(e: THREE.Vector3, v: THREE.Vector3): number;
    calcNom(p: THREE.Vector3): THREE.Vector3;
    calcShading(q: PointLight, p: THREE.Vector3, e: THREE.Vector3): THREE.Color;
}