import Vector3 = BABYLON.Vector3;


export class Player {

    //(meshes: AbstractMesh[], particleSystems: ParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[])

    private meshes : BABYLON.AbstractMesh[];
    private particleSystems : BABYLON.ParticleSystem[];
    private skeletons : BABYLON.Skeleton[];
    private animationGroups : BABYLON.AnimationGroup[];

    constructor(protected _scene : BABYLON.Scene ,
                public id : string,
                public path : string,
                public file : string) {

    }

    public load () : this {
        BABYLON.SceneLoader.ImportMesh(this.id, this.path, this.file, this._scene, (meshes, particleSystems, skeletons, animationGroups) => {
            this.meshes = meshes;
            this.meshes[0].scaling = new Vector3(0.02,0.02,0.02);
            this.meshes[0].position = new Vector3(1,0.5,1);
            this.particleSystems = particleSystems;
            this.skeletons = skeletons;
            this.animationGroups = animationGroups;

            this.meshes[0].checkCollisions = true;
            this.meshes[0].ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
            this.meshes[0].ellipsoidOffset = new BABYLON.Vector3(0, 1.9, 0);
            //this.meshes[0].applyGravity = true;

            let animationBox = new BABYLON.Animation('toto','position.x',25,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            this.walk();
            this.meshes[0].isPickable = false;
        });
        return this;
    }


    public walk () : this {
        this._scene.beginAnimation(this.skeletons[0], 0, 100, true, 1);
        return this;
    }

}
/*





  var animationBox = new BABYLON.Animation("myAnimation",
                                           this.anim_param(vector),
                                           25,
                                           BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                           BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

  var keys = [
    { frame: 0, value: this.anim_value_old(vector) },
    { frame: 15, value: this.anim_value_new(vector) }
  ];

  animationBox.setKeys(keys);
  this.main_mesh.animations.push(animationBox);

  this.scene.beginAnimation(this.main_mesh, 0, 15, true);
  this.moving = true;
  this.queue_walkcycle();

  var _this = this;
  setTimeout(function(){
    _this.moving = false;
  }, 600);

  this.main_mesh.animations.pop(animationBox);

 */