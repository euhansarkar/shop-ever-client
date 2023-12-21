/* eslint-disable react/jsx-no-undef */
import {
  ClearOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Drawer, Grid, Image, Row } from "antd";

type ICart = {
  showDrawer: () => void;
  onClose: () => void;
  open: boolean;
};

const SECart = ({ showDrawer, onClose, open }: ICart) => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm } = useBreakpoint();


  return (
    <>
      <Badge count={0} showZero>
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={showDrawer}
          size={sm ? "default" : "small"}
          icon={<ShoppingOutlined />}
        />
      </Badge>
      <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "20px" }}>SubTotal:</p>
            <p style={{ fontSize: "20px" }}>
              {/* {total.toFixed(2)} */}
              50
            </p>
          </div>
          <Button style={{ width: "100%" }}>view cart</Button>
          <Button style={{ width: "100%" }}>view checkout</Button>
        </div>

        {/* cart items */}

        <div style={{ maxHeight: "450px", overflowY: "scroll" }}>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
          <Row
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Col span={6}>
              <Image
                width="100%"
                alt="image"
                height={60}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <h2>Haylou GST</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button>
                  <PlusOutlined />
                </Button>
                <Button>5</Button>
                <Button>
                  <MinusOutlined />
                </Button>
              </div>
              <p style={{ fontSize: "17px" }}>5 * 20</p>
            </Col>
          </Row>
        </div>
      </Drawer>
    </>
  );
};

export default SECart;
