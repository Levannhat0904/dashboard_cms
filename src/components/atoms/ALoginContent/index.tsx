import { cn } from '../../../utils'
interface IDivProps {
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}
const LoginContent: React.FC<IDivProps> = ({ children, className }) => {
  const style =
    'login-content box-border scr_575:w-full scr_575:pt-5 scr_575:pl-5 scr_575:pb-[10px] scr_575:pr-5 relative flex w-[40%] flex-col flex-nowrap overflow-hidden pb-[20px] pl-[35px] pr-[35px] pt-[35px] text-white'
  return <div className={cn(style, className)}>{children}</div>
}

export default LoginContent
