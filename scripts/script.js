const Scene = require('Scene');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Materials = require('Materials');

// you can choose to show native ui slider or picker or both //

// script to show native ui picker
Promise.all([
    
    // this is background item of native ui picker 
    // You can customize this name with a background icon 

    Textures.findFirst('Bg01'), 
    Textures.findFirst('Bg02'),
    Textures.findFirst('Bg03'),

    // this is material background of filter color
    // You can customize this name with a material

    Materials.findFirst('Mat_Bg1'),
    Materials.findFirst('Mat_Bg2'),
    Materials.findFirst('Mat_Bg3'),

    // object rectangle of material

    Scene.root.findFirst('Background')

]).then(function(result){

    const TexBg1 = result[0];
    const TexBg2 = result[1];
    const TexBg3 = result[2];

    const MatBg1 = result[3];
    const MatBg2 = result[4];
    const MatBg3 = result[5];

    const bg = result[6];

    // start value of native ui picker
    const index = 0;
    const configuration = {
        selectedIndex: index,

        items: [
            {image_texture: TexBg1},
            {image_texture: TexBg2},
            {image_texture: TexBg3}
        ],
        mats: [
            {material: MatBg1},
            {material: MatBg2},
            {material: MatBg3}
        ]
    };

    const picker = NativeUI.picker;
    picker.configure(configuration);

    // to show native ui picker
    picker.visible = true;

    picker.selectedIndex.monitor().subscribe(function(val){
        bg.material = configuration.mats[val.newValue].material
    });
});


// script to show native ui slider

Promise.all([

    // this is material background of filter color
    // You can customize this name with a material

    Materials.findFirst('Mat_Bg1'),
    Materials.findFirst('Mat_Bg2'),
    Materials.findFirst('Mat_Bg3'),

]).then(function(mat){

    const Bg1 = mat[0];
    const Bg2 = mat[1];
    const Bg3 = mat[2];

    var lastSliderValue = 0.5; // default value of slider
    const slider = NativeUI.slider;

    slider.value.monitor({fireOnInitialValue:false}).subscribe(function(val){
        lastSliderValue = val.newValue;

        // to set opacity 
        Bg1.opacity = lastSliderValue;  
        Bg2.opacity = lastSliderValue;
        Bg3.opacity = lastSliderValue;
    });

    slider.value = lastSliderValue;
    // to show native ui slider
    slider.visible = true;
})