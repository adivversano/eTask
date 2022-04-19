import './styles/styles.scss';
import { useSelector } from 'react-redux';
import { Home } from './views/Home/Home';
import { DynamicPopover } from './cmps/Popovers/DynamicPopover';
import { Header } from './cmps/Header/Header';

export const App = () => {
  const { popover } = useSelector(state => state.appModule);

  return (
    <div className="main-container">
      <Header />

      <main>
        <Home />
      </main>

      {popover.type &&
        <DynamicPopover />
      }
    </div>
  )
}
