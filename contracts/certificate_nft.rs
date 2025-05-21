#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use cw2::set_contract_version;
use cw721::{ContractInfoResponse, Cw721ReceiveMsg};
use cw721_base::{
    msg::{ExecuteMsg, InstantiateMsg, QueryMsg},
    state::TokenInfo,
    Cw721Contract, Extension,
};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

// Versiyon bilgisi
const CONTRACT_NAME: &str = "crates.io:certificate-nft";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

// Sertifika metadata'sı
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Metadata {
    // Eğitim kurumunun adı
    pub institution_name: Option<String>,
    // Sertifikanın adı/başlığı
    pub certificate_name: Option<String>,
    // Sertifikayı alan kişinin adı
    pub recipient_name: Option<String>,
    // Veriliş tarihi (ISO8601 formatında)
    pub issue_date: Option<String>,
    // Sertifikanın görsel URL'i
    pub image: Option<String>,
    // Sertifikanın açıklaması
    pub description: Option<String>,
    // Sertifikanın doğrulanması için URL
    pub verification_url: Option<String>,
    // Ekstra özellikler (kurs süresi, not, vs.)
    pub attributes: Option<Vec<Trait>>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug, Default)]
pub struct Trait {
    pub display_type: Option<String>,
    pub trait_type: String,
    pub value: String,
}

// Kontrat tipi
pub type CertificateNftContract<'a> = Cw721Contract<'a, Metadata, Empty>;
pub type Extension = Metadata;

// Boş extension tipi
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Empty {}

// Instantiate işlemi
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let contract = CertificateNftContract::default();
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    contract.instantiate(deps, env, info, msg)
}

// Execute işlemi
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg<Extension>,
) -> Result<Response, cw721_base::ContractError> {
    let contract = CertificateNftContract::default();
    contract.execute(deps, env, info, msg)
}

// Query işlemi
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg<Empty>) -> StdResult<Binary> {
    let contract = CertificateNftContract::default();
    contract.query(deps, env, msg)
} 