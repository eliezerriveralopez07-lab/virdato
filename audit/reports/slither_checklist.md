**THIS CHECKLIST IS NOT COMPLETE**. Use `--show-ignored-findings` to show all the results.
Summary
 - [incorrect-exp](#incorrect-exp) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (9 results) (Medium)
 - [shadowing-local](#shadowing-local) (1 results) (Low)
 - [events-access](#events-access) (3 results) (Low)
 - [events-maths](#events-maths) (1 results) (Low)
 - [missing-zero-check](#missing-zero-check) (3 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (1 results) (Low)
 - [reentrancy-events](#reentrancy-events) (6 results) (Low)
 - [timestamp](#timestamp) (5 results) (Low)
 - [assembly](#assembly) (37 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [solc-version](#solc-version) (4 results) (Informational)
 - [missing-inheritance](#missing-inheritance) (1 results) (Informational)
 - [naming-convention](#naming-convention) (10 results) (Informational)
 - [too-many-digits](#too-many-digits) (5 results) (Informational)
 - [constable-states](#constable-states) (2 results) (Optimization)
## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-0
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) has bitwise-xor operator ^ instead of the exponentiation operator **: 
	 - [inverse = (3 * denominator) ^ 2](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L254)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-1
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [low = low / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L239)
	- [result = low * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L269)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-2
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse = (3 * denominator) ^ 2](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L254)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-3
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L259)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-4
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L261-L262)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-5
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L257)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-6
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L262-L263)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L259-L260)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-8
[Math.invMod(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L308-L352) performs a multiplication on the result of a division:
	- [quotient = gcd / remainder](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L326-L327)
	- [(gcd,remainder) = (remainder,gcd - remainder * quotient)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L327-L340)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L308-L352


 - [ ] ID-9
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L237)
	- [inverse *= 2 - denominator * inverse](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L260-L261)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-10
[ERC20Permit.constructor(string).name](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L37-L38) shadows:
	- [ERC20.name()](lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol#L50-L52) (function)
	- [IERC20Metadata.name()](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol#L13-L15) (function)

lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L37-L38


## events-access
Impact: Low
Confidence: Medium
 - [ ] ID-11
[SlashingModule.setDAO(address)](contracts/src/SlashingModule.sol#L41-L43) should emit an event for: 
	- [dao = newDao](contracts/src/SlashingModule.sol#L43) 

contracts/src/SlashingModule.sol#L41-L43


 - [ ] ID-12
[RewardDistributor.setDAO(address)](contracts/src/RewardDistributorLegacy.sol#L49-L51) should emit an event for: 
	- [dao = newDao](contracts/src/RewardDistributorLegacy.sol#L51) 

contracts/src/RewardDistributorLegacy.sol#L49-L51


 - [ ] ID-13
[ChallengeRegistry.setDAO(address)](contracts/src/ChallengeRegistry.sol#L42-L45) should emit an event for: 
	- [dao = newDao](contracts/src/ChallengeRegistry.sol#L45) 

contracts/src/ChallengeRegistry.sol#L42-L45


## events-maths
Impact: Low
Confidence: Medium
 - [ ] ID-14
[ChallengeRegistry.setMinChallengeBond(uint256)](contracts/src/ChallengeRegistry.sol#L45-L46) should emit an event for: 
	- [minChallengeBond = newBond](contracts/src/ChallengeRegistry.sol#L46) 

contracts/src/ChallengeRegistry.sol#L45-L46


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-15
[SlashingModule.constructor(address,address)._dao](contracts/src/SlashingModule.sol#L21) lacks a zero-check on :
		- [dao = _dao](contracts/src/SlashingModule.sol#L22)

contracts/src/SlashingModule.sol#L21


 - [ ] ID-16
[ChallengeRegistry.constructor(address,address,address,uint256)._dao](contracts/src/ChallengeRegistry.sol#L38) lacks a zero-check on :
		- [dao = _dao](contracts/src/ChallengeRegistry.sol#L40)

contracts/src/ChallengeRegistry.sol#L38


 - [ ] ID-17
[ChallengeRegistry.setDAO(address).newDao](contracts/src/ChallengeRegistry.sol#L42) lacks a zero-check on :
		- [dao = newDao](contracts/src/ChallengeRegistry.sol#L45)

contracts/src/ChallengeRegistry.sol#L42


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-18
Reentrancy in [ChallengeRegistry.openChallenge(address,bytes32)](contracts/src/ChallengeRegistry.sol#L46-L64):
	External calls:
	- [require(bool,string)(vird.transferFrom(msg.sender,address(this),bond),Bond transfer failed)](contracts/src/ChallengeRegistry.sol#L49-L51)
	State variables written after the call(s):
	- [challenges[id] = Challenge({challenger:msg.sender,creator:creator,contentId:contentId,bond:bond,resolved:false,upheld:false,reason:bytes32(0)})](contracts/src/ChallengeRegistry.sol#L51-L60)
	- [id = nextId ++](contracts/src/ChallengeRegistry.sol#L51)

contracts/src/ChallengeRegistry.sol#L46-L64


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-19
Reentrancy in [SlashingModuleV2.withdrawToTreasury(uint256)](contracts/src/SlashingModuleV2.sol#L53-L58):
	External calls:
	- [require(bool,string)(TOKEN.transfer(treasury,amount),Withdraw failed)](contracts/src/SlashingModuleV2.sol#L56-L58)
	Event emitted after the call(s):
	- [WithdrawnToTreasury(amount)](contracts/src/SlashingModuleV2.sol#L58)

contracts/src/SlashingModuleV2.sol#L53-L58


 - [ ] ID-20
Reentrancy in [SlashingModuleV2.bond(uint256)](contracts/src/SlashingModuleV2.sol#L34-L41):
	External calls:
	- [require(bool,string)(TOKEN.transferFrom(msg.sender,address(this),amount),Bond failed)](contracts/src/SlashingModuleV2.sol#L39-L40)
	Event emitted after the call(s):
	- [Bonded(msg.sender,amount)](contracts/src/SlashingModuleV2.sol#L40)

contracts/src/SlashingModuleV2.sol#L34-L41


 - [ ] ID-21
Reentrancy in [ChallengeRegistry.openChallenge(address,bytes32)](contracts/src/ChallengeRegistry.sol#L46-L64):
	External calls:
	- [require(bool,string)(vird.transferFrom(msg.sender,address(this),bond),Bond transfer failed)](contracts/src/ChallengeRegistry.sol#L49-L51)
	Event emitted after the call(s):
	- [Challenged(id,msg.sender,creator,contentId,bond)](contracts/src/ChallengeRegistry.sol#L60-L64)

contracts/src/ChallengeRegistry.sol#L46-L64


 - [ ] ID-22
Reentrancy in [ChallengeRegistry.resolveChallenge(uint256,bool,bytes32,uint256)](contracts/src/ChallengeRegistry.sol#L64-L81):
	External calls:
	- [slashing.slash(c.creator,slashAmount,reason)](contracts/src/ChallengeRegistry.sol#L74-L76)
	- [require(bool,string)(vird.transfer(c.challenger,c.bond),Return bond failed)](contracts/src/ChallengeRegistry.sol#L77-L79)
	- [require(bool,string)(vird.transfer(dao,c.bond),Bond to dao failed)](contracts/src/ChallengeRegistry.sol#L79-L80)
	Event emitted after the call(s):
	- [Resolved(id,upheld,reason,slashAmount)](contracts/src/ChallengeRegistry.sol#L81)

contracts/src/ChallengeRegistry.sol#L64-L81


 - [ ] ID-23
Reentrancy in [MerkleRewardsV2.claim(uint256,uint256,bytes32[])](contracts/src/MerkleRewardsV2.sol#L40-L58):
	External calls:
	- [require(bool,string)(TOKEN.transfer(msg.sender,amount),Transfer failed)](contracts/src/MerkleRewardsV2.sol#L55-L58)
	Event emitted after the call(s):
	- [Claimed(epoch,msg.sender,amount)](contracts/src/MerkleRewardsV2.sol#L58)

contracts/src/MerkleRewardsV2.sol#L40-L58


 - [ ] ID-24
Reentrancy in [MerkleRewardsV2.sweepToTreasury(uint256)](contracts/src/MerkleRewardsV2.sol#L63-L66):
	External calls:
	- [require(bool,string)(TOKEN.transfer(treasury,amount),Sweep failed)](contracts/src/MerkleRewardsV2.sol#L64-L66)
	Event emitted after the call(s):
	- [Swept(treasury,amount)](contracts/src/MerkleRewardsV2.sol#L66)

contracts/src/MerkleRewardsV2.sol#L63-L66


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-25
[MerkleRewardsV2.claim(uint256,uint256,bytes32[])](contracts/src/MerkleRewardsV2.sol#L40-L58) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp <= tFinal + CLAIM_WINDOW,Claim window closed)](contracts/src/MerkleRewardsV2.sol#L50-L51)

contracts/src/MerkleRewardsV2.sol#L40-L58


 - [ ] ID-26
[RewardDistributor.finalizeEpoch(bytes32)](contracts/src/RewardDistributorLegacy.sol#L25-L34) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp >= epochStart + EPOCH_LENGTH,Epoch ongoing)](contracts/src/RewardDistributorLegacy.sol#L27-L28)

contracts/src/RewardDistributorLegacy.sol#L25-L34


 - [ ] ID-27
[ERC20Permit.permit(address,address,uint256,uint256,uint8,bytes32,bytes32)](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L39-L61) uses timestamp for comparisons
	Dangerous comparisons:
	- [block.timestamp > deadline](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L49-L50)

lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L39-L61


 - [ ] ID-28
[RewardDistributorDev.finalizeEpoch(bytes32)](contracts/src/RewardDistributorDev.sol#L26-L41) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp >= epochStart + EPOCH_LENGTH,Epoch ongoing)](contracts/src/RewardDistributorDev.sol#L30-L31)

contracts/src/RewardDistributorDev.sol#L26-L41


 - [ ] ID-29
[RewardDistributorProd.finalizeEpoch(bytes32)](contracts/src/RewardDistributorProd.sol#L26-L41) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp >= epochStart + EPOCH_LENGTH,Epoch ongoing)](contracts/src/RewardDistributorProd.sol#L30-L31)

contracts/src/RewardDistributorProd.sol#L26-L41


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-30
[StorageSlot.getStringSlot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L105-L111) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L109-L111)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L105-L111


 - [ ] ID-31
[Strings.escapeJSON(string)](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L457-L480) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L476-L479)

lib/openzeppelin-contracts/contracts/utils/Strings.sol#L457-L480


 - [ ] ID-32
[ECDSA.tryRecoverCalldata(bytes32,bytes)](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L83-L102) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L94-L97)

lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L83-L102


 - [ ] ID-33
[Panic.panic(uint256)](lib/openzeppelin-contracts/contracts/utils/Panic.sol#L49-L53) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Panic.sol#L50-L53)

lib/openzeppelin-contracts/contracts/utils/Panic.sol#L49-L53


 - [ ] ID-34
[ShortStrings.toString(ShortString)](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L61-L69) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L65-L68)

lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L61-L69


 - [ ] ID-35
[SafeCast.toUint(bool)](lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol#L1120-L1124) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol#L1122-L1123)

lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol#L1120-L1124


 - [ ] ID-36
[StorageSlot.getStringSlot(string)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L115-L120) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L118-L120)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L115-L120


 - [ ] ID-37
[StorageSlot.getInt256Slot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L97-L102) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L101-L102)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L97-L102


 - [ ] ID-38
[Math.tryDiv(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L87-L93) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L89-L93)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L87-L93


 - [ ] ID-39
[Strings.toString(uint256)](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L44-L60) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L49-L52)
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L54-L57)

lib/openzeppelin-contracts/contracts/utils/Strings.sol#L44-L60


 - [ ] ID-40
[StorageSlot.getBytesSlot(bytes)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L131-L138) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L136-L138)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L131-L138


 - [ ] ID-41
[Math.tryModExp(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L404-L423) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L405-L422)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L404-L423


 - [ ] ID-42
[Math.tryMod(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L100-L106) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L102-L106)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L100-L106


 - [ ] ID-43
[Strings._unsafeReadBytesOffset(bytes,uint256)](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L487-L499) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L497-L499)

lib/openzeppelin-contracts/contracts/utils/Strings.sol#L487-L499


 - [ ] ID-44
[MessageHashUtils.toTypedDataHash(bytes32,bytes32)](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L86-L95) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L90-L95)

lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L86-L95


 - [ ] ID-45
[Math.tryModExp(bytes,bytes,bytes)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L436-L462) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L447-L462)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L436-L462


 - [ ] ID-46
[Strings.toChecksumHexString(address)](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L109-L125) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L113-L116)

lib/openzeppelin-contracts/contracts/utils/Strings.sol#L109-L125


 - [ ] ID-47
[ECDSA.parseCalldata(bytes)](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L232-L258) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L237-L258)

lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L232-L258


 - [ ] ID-48
[StorageSlot.getBooleanSlot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L73-L76) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L75)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L73-L76


 - [ ] ID-49
[StorageSlot.getBytesSlot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L122-L129) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L127-L129)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L122-L129


 - [ ] ID-50
[MessageHashUtils.toDataWithIntendedValidatorHash(address,bytes32)](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L67-L76) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L71-L76)

lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L67-L76


 - [ ] ID-51
[StorageSlot.getAddressSlot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L64-L67) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L66-L67)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L64-L67


 - [ ] ID-52
[Bytes._unsafeReadBytesOffset(bytes,uint256)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L236-L241) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L240-L241)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L236-L241


 - [ ] ID-53
[StorageSlot.getUint256Slot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L90-L93) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L93)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L90-L93


 - [ ] ID-54
[ECDSA.parse(bytes)](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L213-L230) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L215-L230)

lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L213-L230


 - [ ] ID-55
[Bytes.splice(bytes,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L115-L124) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L119-L124)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L115-L124


 - [ ] ID-56
[MessageHashUtils.toEthSignedMessageHash(bytes32)](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L28-L34) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L30-L34)

lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L28-L34


 - [ ] ID-57
[Hashes.efficientKeccak256(bytes32,bytes32)](lib/openzeppelin-contracts/contracts/utils/cryptography/Hashes.sol#L22-L28) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/Hashes.sol#L24-L28)

lib/openzeppelin-contracts/contracts/utils/cryptography/Hashes.sol#L22-L28


 - [ ] ID-58
[Bytes.slice(bytes,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L84-L94) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L91-L94)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L84-L94


 - [ ] ID-59
[Bytes.concat(bytes[])](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L137-L152) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L146-L150)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L137-L152


 - [ ] ID-60
[Math.mul512(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L35-L44) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L40-L44)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L35-L44


 - [ ] ID-61
[Math.tryMul(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L71-L81) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L73-L78)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L71-L81


 - [ ] ID-62
[Math.mulDiv(uint256,uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L222-L229)
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L236-L244)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L199-L269


 - [ ] ID-63
[StorageSlot.getBytes32Slot(bytes32)](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L82-L84) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L84)

lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L82-L84


 - [ ] ID-64
[Math.add512(uint256,uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L23-L28) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L25-L28)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L23-L28


 - [ ] ID-65
[Math.log2(uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L592-L640) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L638-L640)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L592-L640


 - [ ] ID-66
[ECDSA.tryRecover(bytes32,bytes)](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L59-L78) uses assembly
	- [INLINE ASM](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L69-L73)

lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L59-L78


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-67
5 different versions of Solidity are used:
	- Version constraint ^0.8.20 is used by:
		-[^0.8.20](contracts/src/ChallengeRegistry.sol#L1-L2)
		-[^0.8.20](contracts/src/MerkleRewards.sol#L1-L2)
		-[^0.8.20](contracts/src/MerkleRewardsV2.sol#L1-L2)
		-[^0.8.20](contracts/src/MyToken.sol#L1-L2)
		-[^0.8.20](contracts/src/RewardDistributorDev.sol#L1-L2)
		-[^0.8.20](contracts/src/RewardDistributorLegacy.sol#L1-L2)
		-[^0.8.20](contracts/src/RewardDistributorProd.sol#L1-L2)
		-[^0.8.20](contracts/src/SlashingModule.sol#L1-L2)
		-[^0.8.20](contracts/src/SlashingModuleV2.sol#L1-L2)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/access/AccessControl.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/Context.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/Nonces.sol#L2-L3)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/Panic.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L3-L5)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/Hashes.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol#L3-L5)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L2-L4)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol#L3-L5)
		-[^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol#L2-L4)
	- Version constraint >=0.8.4 is used by:
		-[>=0.8.4](lib/openzeppelin-contracts/contracts/access/IAccessControl.sol#L2-L4)
		-[>=0.8.4](lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol#L2-L4)
	- Version constraint >=0.4.16 is used by:
		-[>=0.4.16](lib/openzeppelin-contracts/contracts/interfaces/IERC5267.sol#L2-L4)
		-[>=0.4.16](lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol#L2-L4)
		-[>=0.4.16](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol#L2-L4)
		-[>=0.4.16](lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol#L2-L4)
	- Version constraint ^0.8.24 is used by:
		-[^0.8.24](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L2-L4)
		-[^0.8.24](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L2-L4)
		-[^0.8.24](lib/openzeppelin-contracts/contracts/utils/Strings.sol#L2-L4)
		-[^0.8.24](lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L2-L4)
		-[^0.8.24](lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol#L2-L4)
	- Version constraint >=0.6.2 is used by:
		-[>=0.6.2](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol#L2-L4)

contracts/src/ChallengeRegistry.sol#L1-L2


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-68
Version constraint >=0.8.4 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables.
It is used by:
	- [>=0.8.4](lib/openzeppelin-contracts/contracts/access/IAccessControl.sol#L2-L4)
	- [>=0.8.4](lib/openzeppelin-contracts/contracts/interfaces/draft-IERC6093.sol#L2-L4)

lib/openzeppelin-contracts/contracts/access/IAccessControl.sol#L2-L4


 - [ ] ID-69
Version constraint ^0.8.20 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- VerbatimInvalidDeduplication
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess.
It is used by:
	- [^0.8.20](contracts/src/ChallengeRegistry.sol#L1-L2)
	- [^0.8.20](contracts/src/MerkleRewards.sol#L1-L2)
	- [^0.8.20](contracts/src/MerkleRewardsV2.sol#L1-L2)
	- [^0.8.20](contracts/src/MyToken.sol#L1-L2)
	- [^0.8.20](contracts/src/RewardDistributorDev.sol#L1-L2)
	- [^0.8.20](contracts/src/RewardDistributorLegacy.sol#L1-L2)
	- [^0.8.20](contracts/src/RewardDistributorProd.sol#L1-L2)
	- [^0.8.20](contracts/src/SlashingModule.sol#L1-L2)
	- [^0.8.20](contracts/src/SlashingModuleV2.sol#L1-L2)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/access/AccessControl.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/Context.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/Nonces.sol#L2-L3)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/Panic.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol#L3-L5)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/Hashes.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol#L3-L5)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L2-L4)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol#L3-L5)
	- [^0.8.20](lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol#L2-L4)

contracts/src/ChallengeRegistry.sol#L1-L2


 - [ ] ID-70
Version constraint >=0.6.2 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- NestedCalldataArrayAbiReencodingSizeValidation
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching
	- EmptyByteArrayCopy
	- DynamicArrayCleanup
	- MissingEscapingInFormatting
	- ArraySliceDynamicallyEncodedBaseType
	- ImplicitConstructorCallvalueCheck
	- TupleAssignmentMultiStackSlotComponents
	- MemoryArrayCreationOverflow.
It is used by:
	- [>=0.6.2](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol#L2-L4)

lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol#L2-L4


 - [ ] ID-71
Version constraint >=0.4.16 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- DirtyBytesArrayToStorage
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching
	- EmptyByteArrayCopy
	- DynamicArrayCleanup
	- ImplicitConstructorCallvalueCheck
	- TupleAssignmentMultiStackSlotComponents
	- MemoryArrayCreationOverflow
	- privateCanBeOverridden
	- SignedArrayStorageCopy
	- ABIEncoderV2StorageArrayWithMultiSlotElement
	- DynamicConstructorArgumentsClippedABIV2
	- UninitializedFunctionPointerInConstructor_0.4.x
	- IncorrectEventSignatureInLibraries_0.4.x
	- ExpExponentCleanup
	- NestedArrayFunctionCallDecoder
	- ZeroFunctionSelector.
It is used by:
	- [>=0.4.16](lib/openzeppelin-contracts/contracts/interfaces/IERC5267.sol#L2-L4)
	- [>=0.4.16](lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol#L2-L4)
	- [>=0.4.16](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol#L2-L4)
	- [>=0.4.16](lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol#L2-L4)

lib/openzeppelin-contracts/contracts/interfaces/IERC5267.sol#L2-L4


## missing-inheritance
Impact: Informational
Confidence: High
 - [ ] ID-72
[SlashingModuleV2](contracts/src/SlashingModuleV2.sol#L4-L76) should inherit from [ISlashingModuleV2](contracts/src/ChallengeRegistry.sol#L4-L7)

contracts/src/SlashingModuleV2.sol#L4-L76


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-73
Variable [MerkleRewardsV2.DISTRIBUTOR](contracts/src/MerkleRewardsV2.sol#L13-L14) is not in mixedCase

contracts/src/MerkleRewardsV2.sol#L13-L14


 - [ ] ID-74
Variable [SlashingModule.VDT](contracts/src/SlashingModule.sol#L7-L8) is not in mixedCase

contracts/src/SlashingModule.sol#L7-L8


 - [ ] ID-75
Function [EIP712._EIP712Version()](lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L154-L156) is not in mixedCase

lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L154-L156


 - [ ] ID-76
Variable [MerkleRewards.DISTRIBUTOR](contracts/src/MerkleRewards.sol#L15-L16) is not in mixedCase

contracts/src/MerkleRewards.sol#L15-L16


 - [ ] ID-77
Function [IERC20Permit.DOMAIN_SEPARATOR()](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol#L86-L88) is not in mixedCase

lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Permit.sol#L86-L88


 - [ ] ID-78
Function [ERC20Permit.DOMAIN_SEPARATOR()](lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L72-L74) is not in mixedCase

lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol#L72-L74


 - [ ] ID-79
Variable [SlashingModuleV2.TOKEN](contracts/src/SlashingModuleV2.sol#L6-L7) is not in mixedCase

contracts/src/SlashingModuleV2.sol#L6-L7


 - [ ] ID-80
Function [EIP712._EIP712Name()](lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L143-L145) is not in mixedCase

lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L143-L145


 - [ ] ID-81
Variable [MerkleRewardsV2.TOKEN](contracts/src/MerkleRewardsV2.sol#L12-L13) is not in mixedCase

contracts/src/MerkleRewardsV2.sol#L12-L13


 - [ ] ID-82
Variable [MerkleRewards.VDT](contracts/src/MerkleRewards.sol#L12-L13) is not in mixedCase

contracts/src/MerkleRewards.sol#L12-L13


## too-many-digits
Impact: Informational
Confidence: Medium
 - [ ] ID-83
[Bytes.reverseBytes16(bytes16)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L185-L198) uses literals with too many digits:
	- [value = ((value & 0xFFFFFFFF00000000FFFFFFFF00000000) >> 32) | ((value & 0x00000000FFFFFFFF00000000FFFFFFFF) << 32)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L193-L196)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L185-L198


 - [ ] ID-84
[Bytes.reverseBytes32(bytes32)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L170-L184) uses literals with too many digits:
	- [value = ((value >> 32) & 0x00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF) | ((value & 0x00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF) << 32)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L178-L181)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L170-L184


 - [ ] ID-85
[Bytes.reverseBytes32(bytes32)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L170-L184) uses literals with too many digits:
	- [value = ((value >> 64) & 0x0000000000000000FFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF) | ((value & 0x0000000000000000FFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF) << 64)](lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L181-L184)

lib/openzeppelin-contracts/contracts/utils/Bytes.sol#L170-L184


 - [ ] ID-86
[ShortStrings.slitherConstructorConstantVariables()](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L35-L116) uses literals with too many digits:
	- [FALLBACK_SENTINEL = 0x00000000000000000000000000000000000000000000000000000000000000FF](lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L41-L42)

lib/openzeppelin-contracts/contracts/utils/ShortStrings.sol#L35-L116


 - [ ] ID-87
[Math.log2(uint256)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L592-L640) uses literals with too many digits:
	- [r = r | byte(uint256,uint256)(x >> r,0x0000010102020202030303030303030300000000000000000000000000000000)](lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L638-L640)

lib/openzeppelin-contracts/contracts/utils/math/Math.sol#L592-L640


## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-88
[EIP712._versionFallback](lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L53) should be constant 

lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L53


 - [ ] ID-89
[EIP712._nameFallback](lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L51) should be constant 

lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol#L51


