import { NavLink } from 'react-router-dom';

const Index = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div>Redis + tRPC = ...</div>
        <NavLink to='/tasks'>Tasks</NavLink>
      </div>
    </div>
  );
};

export default Index;
