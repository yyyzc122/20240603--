/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

function preload(){  //圖片檔
  carImg= loadImage("car.gif")
  }
 
  let video, bodypose, pose, keypoint, detector;
  let poses = [];
 
 
 
 
  async function init() {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    };
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
  }
 
  async function videoReady() {
    console.log("video ready");
    await getPoses();
  }
 
  async function getPoses() {
    if (detector) {
      poses = await detector.estimatePoses(video.elt, {
        maxPoses: 2,
        //flipHorizontal: true,
      });
    }
    requestAnimationFrame(getPoses);
  }
  var car
  async function setup() {
    createCanvas(640,480);
    video = createCapture(VIDEO, videoReady);
    video.size(width, height);
    video.hide();
    await init();
 
    stroke(255);
    strokeWeight(5);
    
    

  }
 
  function draw() {
    image(video, 0, 0);
    // 繪製骨架
    drawSkeleton();
    // 水平翻轉
    cam = get();
    translate(cam.width, 0);
    scale(-1, 1);
    image(cam, 0, 0);
    
  }
 
  function drawSkeleton() {
    // 繪製所有跟蹤到的關鍵點
    for (let i = 0; i < poses.length; i++) {
      pose = poses[i];
    //肩到手腕
 
      partA = pose.keypoints[0];
 
      if(partA.score > 0.1){
        push()
          textSize(40)
          scale(-1,1)
          text("412737065,車宜蓁",partA.x-width,partA.y-150)  //名字
        pop()
      }
     
      for (j = 5; j < 9; j++) {
        if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
          partA = pose.keypoints[j];
          partB = pose.keypoints[j + 2];
          //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
        }
      }
      // 肩到肩
      partA = pose.keypoints[5];
      partB = pose.keypoints[6];
      if (partA.score > 0.1 && partB.score > 0.1) {
          //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
      
      push()
        image(carImg,partA.x-75, partA.y-75,150,150)  //左肩圖片
        image(carImg,partB.x-75, partB.y-75,150,150)  //右肩圖片
      pop()
      
      }
       
      
      // 臀到臀
      partA = pose.keypoints[11];
      partB = pose.keypoints[12];
      if (partA.score > 0.1 && partB.score > 0.1) {
        //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
       
      }
      // 肩到臀
      partA = pose.keypoints[5];
      partB = pose.keypoints[11];
      if (partA.score > 0.1 && partB.score > 0.1) {
        //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
       
      }
      partA = pose.keypoints[6];
      partB = pose.keypoints[12];
      if (partA.score > 0.1 && partB.score > 0.1) {
        //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
       
      }
      // 臀到脚
      for (j = 11; j < 15; j++) {
        if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
          partA = pose.keypoints[j];
          partB = pose.keypoints[j + 2];
          //line(partA.x, partA.y, partB.x, partB.y);  //不要線條
         
        }
      }
    }
  }
 
  /* Points (view on left of screen = left part - when mirrored)
    0 nose
    1 left eye
    2 right eye
    3 left ear
    4 right ear
    5 left shoulder
    6 right shoulder
    7 left elbow
    8 right elbow
    9 left wrist
    10 right wrist
    11 left hip
    12 right hip
    13 left kneee
    14 right knee
    15 left foot
    16 right foot
  */
