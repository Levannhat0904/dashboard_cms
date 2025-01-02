import { Button, ButtonProps } from 'antd'

interface ButtonComponentProps extends ButtonProps {
  children?: React.ReactNode
}

const NButtonComponent: React.FC<ButtonComponentProps> = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)

export default NButtonComponent
