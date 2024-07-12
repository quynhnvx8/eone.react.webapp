import { HeaderComponent, SiderComponent } from "@/components";
import { Layout } from "antd";
import type { AppProps } from "next/app";

const { Header, Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <HeaderComponent />
      <Layout>
        <SiderComponent />
        <Content>
          <div className="container-fuild ">
            <Component {...pageProps} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
