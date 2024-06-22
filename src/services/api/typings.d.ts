declare namespace API {
  type CheckUserNameRequest = {
    user_name?: string;
  };

  type CheckUserNameResponse = {
    /** 0-unregistered user 1-registered user 2-migrate user 99-banned user */
    type?: UserType;
  };

  type CreateNodeGroupRequest = {
    name: string;
    node_group_order?: number;
    remarks?: string;
  };

  type CreateNodeRequest = {
    address?: string;
    enabled?: boolean;
    extra_config?: NodeExtra;
    name: string;
    node_group_id?: number;
    node_order?: number;
    node_speed_limit?: number;
    node_type?: string;
    port?: number;
    protocol?: string;
    remarks?: string;
    status?: NodeStatus;
    traffic_rate?: number;
  };

  type CreateOrderRequest = {
    duration: number;
    product_id: number;
  };

  type CreateOrderResponse = {
    order_id?: number;
  };

  type CreatePaymentRequest = {
    order_id?: number;
    payment_type?: PaymentType;
  };

  type CreatePaymentResponse = {
    payment_id?: number;
    status?: number;
  };

  type CreateProductRequest = {
    description?: string;
    enable_traffic_reset?: boolean;
    is_sale?: boolean;
    is_show?: boolean;
    name: string;
    node_connector?: number;
    node_groups?: number[];
    node_speed_limit?: number;
    nodes?: number[];
    price?: number;
    price_traffic_reset?: number;
    product_order?: number;
    quota?: number;
    remarks?: string;
    stock?: number;
    total_bandwidth?: number;
  };

  type CreateUserRequest = {
    nick_name?: string;
    password?: string;
    user_name?: string;
  };

  type DeletedAt = {
    time?: string;
    /** Valid is true if Time is not NULL */
    valid?: boolean;
  };

  type DeleteNodeGroupRequest = {
    id: number;
  };

  type DeleteNodeRequest = {
    id: number;
  };

  type DeleteProductRequest = {
    id: number;
  };

  type GetSiteConfigResponse = {
    enable_register?: boolean;
    host?: string;
    site_desc?: string;
    site_logo?: string;
    site_name?: string;
    tos_url?: string;
  };

  type GetSiteConfigResponse = {
    enable_register?: boolean;
    host?: string;
    site_desc?: string;
    site_logo?: string;
    site_name?: string;
    tos_url?: string;
  };

  type GetUserInfoResponse = {
    avatar?: string;
    balance?: number;
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    enable?: boolean;
    id?: number;
    is_manager?: boolean;
    nick_name?: string;
    /** update time */
    updated_at?: string;
    user_name?: string;
    uuid?: string;
  };

  type GetUserInfoResponse = {
    avatar?: string;
    balance?: number;
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    enable?: boolean;
    id?: number;
    is_manager?: boolean;
    nick_name?: string;
    /** update time */
    updated_at?: string;
    user_name?: string;
    uuid?: string;
  };

  type ListNodeGroupRequest = {
    page?: number;
    size?: number;
  };

  type ListNodeGroupResponse = {
    list?: NodeGroup[];
    total?: number;
  };

  type ListNodeRequest = {
    node_group_id?: number;
    page?: number;
    size?: number;
  };

  type ListNodeResponse = {
    list?: Node[];
    total?: number;
  };

  type ListOrderRequest = {
    page?: number;
    size?: number;
  };

  type ListOrderResponse = {
    list?: Order[];
    total?: number;
  };

  type ListProductResponse = {
    list?: Product[];
  };

  type ListProductResponse = {
    list?: Product[];
  };

  type LoginRequest = {
    password?: string;
    user_name?: string;
  };

  type LoginResponse = {
    token?: string;
  };

  type Node = {
    address?: string;
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    enabled?: boolean;
    extra_config?: NodeExtra;
    id?: number;
    name: string;
    node_group_id?: number;
    node_order?: number;
    node_speed_limit?: number;
    node_type?: string;
    port?: number;
    protocol?: string;
    remarks?: string;
    status?: NodeStatus;
    traffic_rate?: number;
    /** update time */
    updated_at?: string;
  };

  type NodeExtra = {
    enable_tls?: boolean;
    enable_vless?: boolean;
    host?: string;
    hy_down_mbps?: number;
    hy_obfs?: string;
    hy_obfs_password?: string;
    hy_ports?: string;
    hy_up_mbps?: number;
    method?: string;
    network?: string;
    path?: string;
    server_key?: string;
    service_name?: string;
    /** 中转参数 */
    transfer_address?: string;
    transfer_port?: number;
    transport_protocol?: string;
  };

  type NodeGroup = {
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    id?: number;
    name: string;
    node_group_order?: number;
    remarks?: string;
    /** update time */
    updated_at?: string;
  };

  type NodeInfoRequest = {
    node_id?: number;
  };

  type NodeInfoResponse = {
    address?: string;
    enable_tls?: boolean;
    enable_vless?: boolean;
    host?: string;
    method?: string;
    name?: string;
    node_order?: number;
    node_speed_limit?: number;
    node_type?: string;
    path?: string;
    port?: number;
    remarks?: string;
    server_key?: string;
    service_name?: string;
    transport_protocol?: string;
  };

  type NodeStatus = 1 | 0;

  type Order = {
    balance_amount?: number;
    buyer_pay_amount?: number;
    coupon_amount?: number;
    coupon_id?: number;
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    /** Duration in month */
    duration?: number;
    id?: number;
    original_amount?: number;
    product_id?: number;
    /** Order Status: 0: Pending, 1: Paid, 2: Failed, 3: Canceled */
    status?: OrderStatus;
    total_amount?: number;
    trade_no?: string;
    /** update time */
    updated_at?: string;
    user_id?: number;
  };

  type OrderStatus = 1 | 2 | 3 | 4 | 5;

  type PaymentType = 1 | 2 | 3;

  type Product = {
    /** created time */
    created_at?: string;
    /** delete time */
    deleted_at?: DeletedAt;
    description?: string;
    enable_traffic_reset?: boolean;
    id?: number;
    is_sale?: boolean;
    is_show?: boolean;
    name: string;
    node_connector?: number;
    node_groups?: NodeGroup[];
    node_speed_limit?: number;
    nodes?: Node[];
    price?: number;
    price_traffic_reset?: number;
    product_order?: number;
    quota?: number;
    remarks?: string;
    stock?: number;
    total_bandwidth?: number;
    /** update time */
    updated_at?: string;
  };

  type Response = {
    code?: number;
    data?: any;
    msg?: string;
  };

  type UpdateNodeGroupRequest = {
    id: number;
    name: string;
    node_group_order?: number;
    remarks?: string;
  };

  type UpdateNodeRequest = {
    address?: string;
    enabled?: boolean;
    extra_config?: NodeExtra;
    id: number;
    name: string;
    node_group_id?: number;
    node_order?: number;
    node_speed_limit?: number;
    node_type?: string;
    port?: number;
    protocol?: string;
    remarks?: string;
    status?: NodeStatus;
    traffic_rate?: number;
  };

  type UpdateProductRequest = {
    description?: string;
    enable_traffic_reset?: boolean;
    id: number;
    is_sale?: boolean;
    is_show?: boolean;
    name: string;
    node_connector?: number;
    node_groups?: number[];
    node_speed_limit?: number;
    nodes?: number[];
    price?: number;
    price_traffic_reset?: number;
    product_order?: number;
    quota?: number;
    remarks?: string;
    stock?: number;
    total_bandwidth?: number;
  };

  type UpdateSiteConfigRequest = {
    enable_register?: boolean;
    host?: string;
    site_desc?: string;
    site_logo?: string;
    site_name?: string;
    tos_url?: string;
  };

  type UserListRequest = {
    node_id?: number;
  };

  type UserListResponse = {
    list?: UserListResponseItem[];
  };

  type UserListResponseItem = {
    device_limit?: number;
    speed_limit?: number;
    uid?: number;
    user_name?: string;
    uuid?: string;
  };

  type UserType = 0 | 1 | 2 | 99;
}
