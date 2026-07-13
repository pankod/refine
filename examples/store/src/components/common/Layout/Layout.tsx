import clsx from "clsx";
import type { LayoutProps } from "@refinedev/core";
import dynamic from "next/dynamic";

import { Sidebar, Button, LoadingDots } from "@components/ui";
import { MenuSidebarView, Footer, Navbar } from "@components/common";
import { useUI } from "@lib/context";
import LoginView from "@components/auth/LoginView";
import { CartSidebarView } from "@components/cart";
import { useAcceptCookies } from "@lib/hooks";

const Loading = () => (
  <div className="flex h-80 w-80 items-center justify-center p-3 text-center">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
};

const SignUpView = dynamic(() => import("@components/auth/SignUpView"), {
  ...dynamicProps,
});

const FeatureBar = dynamic(() => import("@components/common/FeatureBar"), {
  ...dynamicProps,
});

const Modal = dynamic(() => import("@components/ui/Modal"), {
  ...dynamicProps,
  ssr: false,
});

const ModalView: React.FC<{ modalView: string; closeModal: () => void }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === "LOGIN_VIEW" && <LoginView />}
      {modalView === "SIGNUP_VIEW" && <SignUpView />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const SidebarView: React.FC<{
  sidebarView: string;
  closeSidebar: () => void;
  links: { title: string; id: string }[];
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === "CART_VIEW" && <CartSidebarView />}
      {sidebarView === "MOBILE_MENU_VIEW" && <MenuSidebarView links={links} />}
    </Sidebar>
  );
};

const SidebarUI: React.FC<{ links: { title: string; id: string }[] }> = ({
  links,
}) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <div
      className={clsx(
        "p-4",
        "sm:p-6",
        "md:p-8",
        "lg:p-10",
        "flex",
        "flex-col",
        "gap-10",
        "w-full",
        "max-w-screen-max-content",
        "mx-auto",
        "min-h-[calc(100svh-48px)]",
      )}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ModalUI />
      <SidebarUI links={[]} />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button
            className={clsx("mx-5", "py-2", "px-4", "rounded-lg")}
            onClick={() => onAcceptCookies()}
          >
            Accept cookies
          </Button>
        }
      />
    </div>
  );
};

export default Layout;
