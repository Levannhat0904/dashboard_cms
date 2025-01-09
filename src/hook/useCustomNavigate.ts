import { useNavigate } from 'react-router-dom';
import { useEvenEdit } from '../contexts/EventContext';
const useCustomNavigate = () => {
  const navigate = useNavigate();
  const { isEdit, setPath, setIsOpenNotify } = useEvenEdit();

  const customNavigate = (path: string) => {
    setPath(path)
    if (!isEdit) {
      setIsOpenNotify(false); // Cập nhật trạng thái trong context
    }
    if (isEdit == true) {
      setIsOpenNotify(true); // Cập nhật trạng thái trong context
      return
    }
    navigate(path)
  };
  return customNavigate;
};

export default useCustomNavigate;
