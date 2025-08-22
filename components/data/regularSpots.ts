// data/regularSpots.ts
export type SpotTag = '2D' | '3D' | 'Media';

export interface RegularSpot {
  title: string;
  images?: string[];
  tags?: SpotTag[]; // ← NEW (optional)
}

export const regularSpots: Record<string, RegularSpot> = {
  // SMFA BASEMENT *****************
  
  CorridorA000C2: {
    title: 'Felipe Gallery',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745522/IMG_9756_jkibpg.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745508/IMG_9754_metd3v.jpg',
    ],
    tags:['2D'],
  },
    CorridorB000C1: {
    title: 'Vending Gallery I',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745815/IMG_9763_colatj.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745814/IMG_9762_aupmdy.jpg',
    ],
    tags:['2D'],
  },
    CorridorB000C2: {
    title: 'Vending Gallery II',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745893/IMG_9765_khcjpb.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745892/IMG_9764_apn10j.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745890/IMG_9768_b0zrcr.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745889/IMG_9767_olzsuc.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745887/IMG_9769_ftkiir.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745886/IMG_9766_ghzagt.jpg',
    ],
    tags:['2D'],
  },
    // lower Mural
    CorridorA000C2_2: {
    title: 'Lower Mural',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745469/IMG_9755_r9i9rr.jpg',
    ],
    tags:['2D'],
  },
    CorridorA000C1_2: {
    title: 'Lowercase Gallery',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745659/IMG_9758_l744yg.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745570/IMG_9757_dn3yxj.jpg',
    ],
    tags:['2D'],
  },

  // SMFA LEVEL 1 *****************
    CorridorA100C1: {
    title: 'Walter Gallery',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745960/IMG_9748_z8kda2.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745959/IMG_9749_dhhvbz.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745957/IMG_9750_fcrhkn.jpg',
    ],
    tags:['2D'],
  },
  CorridorA100C2: {
    title: 'Building A Gallery (BAG)',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804044/IMG_0060_cl2irf.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804044/IMG_0062_sbcvid.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804045/IMG_0063_evszgq.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804044/IMG_0064_k0tdmq.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804044/IMG_0065_lzzjl6.jpg',
    ],
    tags:['2D'],
  },

    // BAG gallery is the adminission, all the way down

    // delete
  //     CorridorB100C2: {
  //   title: 'Building A Gallery BAG',
  //   images: [
  //     'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745985/IMG_9751_i2zmyn.jpg',
  //     'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745988/IMG_9752_ur6zkg.jpg',
  //     'https://res.cloudinary.com/dlekamlwc/image/upload/v1753745986/IMG_9753_wzcq8k.jpg',
  //   ],
  // },

  // SMFA LEVEL 2 *****************
    
  // Felipe Gallery
  CorridorA200C4: {
    title: 'Edwin Gallery',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746048/IMG_9734_lyxyuq.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746046/IMG_9735_u9f2lf.jpg',
    ],
    tags:['2D','3D'],
  },

        CorridorB200C1: {
    title: 'Terrace Gallery I',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746088/IMG_9731_o5rren.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746086/IMG_9730_sb5xaf.jpg',
    ],
    tags:['2D','3D'],
  },

        CorridorB200C2: {
    title: 'Terrace Gallery II',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746103/IMG_9728_yoomqs.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746101/IMG_9729_qow2yj.jpg',
    ],
    tags:['2D'],
  },
  
  DeanSuiteTVDisplay: {

    title: 'Dean Suite Monitor',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753826815/IMG_9787_zqxizu.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753826814/IMG_9785_uawzfi.jpg',
			'https://res.cloudinary.com/dlekamlwc/image/upload/v1753826813/IMG_9786_ov0gkk.jpg',
    ],
    tags:['Media'],
  },

  
  // SMFA LEVEL 3 *****************
  CorridorA300C2: {
    title: 'Annalee Gallery I',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746254/IMG_9746_wsqzop.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746251/IMG_9747_h117yk.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746249/IMG_9745_zn05q3.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746246/IMG_9744_aanzya.jpg',
    ],
    tags:['2D'],
  },
  CorridorA300C3: {
    title: 'Annalee Gallery II',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746219/IMG_9741_b5qo8r.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746216/IMG_9742_bvy7wj.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746213/IMG_9743_nhydlh.jpg',
    ],
    tags:['2D'],
  },


  DarinGallery: {
    title: 'Darin Gallery',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804780/IMG_0055_ias1cp.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804780/IMG_0056_wtjqol.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1755804780/IMG_0057_jnpmlw.jpg',
    ],
    tags:['2D'],
  },

  CorridorA300C4: {
    title: 'Annalee Gallery Corner',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746181/IMG_9739_ob8lig.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746178/IMG_9740_tirreb.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753746183/IMG_9738_u3c17d.jpg',
    ],
    tags:['3D'],
  },

  // Barnum LEVEL B *****************
  CorridorLLH0: {
    title: 'Corridor LLH0',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825555/IMG_9783_vyuehm.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825555/IMG_9782_vnisuq.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825554/IMG_9784_b91g80.jpg',
    ],
    tags:['2D'],
  },
    CorridorLLH1: {
    title: 'Corridor LLH0',
    images: [
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825561/IMG_9779_heomi9.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825562/IMG_9780_o1hqvi.jpg',
      'https://res.cloudinary.com/dlekamlwc/image/upload/v1753825562/IMG_9781_kt2ndv.jpg',
    ],
    tags:['2D'],
  },
};
