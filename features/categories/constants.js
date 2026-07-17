import { 
  RiceIcon, 
  PersonalCareIcon, 
  HomeCareIcon, 
  BabyCareIcon, 
  BeveragesIcon,
  OrderIcon
} from '../../components/Icons';

export const CATEGORIES = [
  { name: 'Grocery', banglaName: 'মুদি বাজার', slug: 'rice', color: '#FDF6B2', icon: <RiceIcon size={24} /> },
  { name: 'Personal Care', banglaName: 'পার্সোনাল কেয়ার', slug: 'personal-care', color: '#E1EFFE', icon: <PersonalCareIcon size={24} /> },
  { name: 'Home Care', banglaName: 'হোম কেয়ার', slug: 'home-care', color: '#DEF7EC', icon: <HomeCareIcon size={24} /> },
  { name: 'Baby Care', banglaName: 'বেবি কেয়ার', slug: 'baby-care', color: '#FDE8E8', icon: <BabyCareIcon size={24} /> },
  { name: 'Snacks & Drinks', banglaName: 'স্ন্যাকস ও ড্রিংকস', slug: 'beverages', color: '#F3E8FF', icon: <BeveragesIcon size={24} /> },
  { name: 'More', banglaName: 'আরও', slug: 'all', color: '#F3F4F6', icon: <OrderIcon size={24} /> }
];
