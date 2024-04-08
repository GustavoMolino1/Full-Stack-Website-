'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiCactus,
  GiBowlingStrike,
  
 
  
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla,MdFastfood,MdOutlineHiking } from 'react-icons/md';
import { FaPersonWalking } from "react-icons/fa6";
import { GiThreeFriends,GiSoccerBall,GiPoolTableCorner } from "react-icons/gi";
import { TbKayak } from "react-icons/tb";
import { BiParty } from "react-icons/bi";
import { SiApplearcade } from "react-icons/si";












import Container from '../Container';
import CategoryBox from '../CategoryBox';


export const categories = [
  {
    label: 'Beach Trips',
    icon: TbBeach,
    description: 'The trip will be around the Beach!',
  },
  {
    label: 'Food Trip',
    icon: MdFastfood,
    description: 'The trip will be a culinary trip',
  },
  {
    label: 'Pools Trip',
    icon: TbPool,
    description: 'This is a trip with Pools includes'
  },
  {
    label: 'Lake Trip',
    icon: GiBoatFishing,
    description: 'This is a trip near a lake!'
  },
  {
    label: 'Skiing Trip',
    icon: FaSkiing,
    description: 'This is a skiing Trip!'
  },
  {
    label: 'Caves Trip',
    icon: GiCaveEntrance,
    description: 'This is a cave Trip!'
  },
  {
    label: 'Camping Trip',
    icon: GiForestCamp,
    description: 'This is camping trip!'
  },
  {
    label: 'Desert Trip',
    icon: GiCactus,
    description: 'This is a desert trip'
  },
  {
    label: 'Casual Trip',
    icon: FaPersonWalking,
    description: 'This is a Casual trip'
  },
  {
    label: 'Make Friends Trip',
    icon: GiThreeFriends,
    description: 'Lets Meet New friends.'
  },
  {
    label: 'Bowling',
    icon: GiBowlingStrike,
    description: 'Bowling Trip!',
  },
  {
    label: 'Kayaks',
    icon: TbKayak,
    description: 'Kayaks Trip!',
  },
  {
    label: 'Party',
    icon: BiParty,
    description: 'Club Trip!',
  },
  {
    label: 'Arcade',
    icon: SiApplearcade,
    description: 'Arcade Games!',
  },
  {
    label: 'Soccer',
    icon: GiSoccerBall,
    description: 'Soccer Games!',
  },
  {
    label: '8 -Pool',
    icon: GiPoolTableCorner,
    description: '8 Pool Games!',
  },{
    label: 'Trekking trips',
    icon: MdOutlineHiking,
    description: 'Trekking trips',
  }
  
  
]



  const Categories=()=>{
    const params=useSearchParams();
    const category=params?.get('category');
    const pathname=usePathname();


    // we dont want to show the catergories in the Main page
    const isMainPage=pathname=='/';
    if(!isMainPage){
       return null
      }


    return(
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
      {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            selected={category==item.label}
            icon={item.icon}
            
          
          />
        ))}
      </div>
    </Container>
    );
  
  
}
 
export default Categories;