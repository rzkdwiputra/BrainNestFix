import React, {FC,useEffect,useState} from 'react'
import { styles } from "../styles/style";
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
type Props = {}

const ChangePassword:FC<Props> = (props) => {
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation()

    const passwordChangeHandler = async (e:any) =>{
        e.preventDefault();
        if(newPassword !== confirmPassword){
            toast.error("Password do not match");
        }else {
            await updatePassword({oldPassword,newPassword})
        }
    }

    useEffect (()=>{
        if(isSuccess){
            toast.success("Password changed successfully")
        }
        if(error) {
            if (typeof error === 'object' && 'data' in error) {
            const errorData = error as { data: { message: string } };
            toast.error(errorData.data.message);
        }
        }
    }, [isSuccess,error])

  return (
    <div className='w-full pl-7 px-2 800px:-5 800px:pl-0 ' >
    <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-white text-black pb-2 ' >
        Change Password
    </h1>
    <div className='w-full' >
        <form 
        aria-required
        onSubmit={passwordChangeHandler}
        className='flex flex-col items-center'
        >
            <div className=' w-[100%] 800px:w-[60%] mt-5 '>
                <label className=' block pb-2 dark:text-white text-black' >Enter your old password</label>
                <input
                type='password'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
                required
                value={oldPassword}
                onChange={(e)=> setOldPassword(e.target.value) }
                />
            </div>
            <div className='w-[100%] 800px:w-[60%] mt-2 ' >
                <label className='block pb-2 dark:text-white text-black' >Enter your new password</label>
                <input
                type='password'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`}
                required
                value={newPassword}
                onChange = {(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className='w-[100%] 800px:w-[60%] mt-2 dark:text-white text-black ' >
                <label className='block pb-2  ' >
                    Enter your confirmm password
                </label>
                <input
                type='password'
                className={`${styles.input} !w-[95%] mb-4 800:mb-0  dark:text-white text-black`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value) }
                />
                <input
                className={`w-[95%] h-[40px] border border-[#37a39a] text-center  dark:text-white text-black  rounded-[3px] mt-8 cursor-pointer `}
                required
                value="Update"
                type='submit'
                />
            </div>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword