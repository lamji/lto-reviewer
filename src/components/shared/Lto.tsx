"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw, Trophy, BookOpen } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const questions = [
  {
    id: 1,
    question: "Ang ibig sabihin ng kumikislap na dilaw na ilaw ay:",
    options: [
      "mayroon kang right of way kapag kumikislap ang pulang ilaw",
      "magmabagal at pagpatuloy sa sangandaan na may pag-iingat",
      "ang mga sasakyan ay tumutigil mula sa kabila",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang kumikislap na dilaw na ilaw ay nangangahulugang dapat magmabagal at magpatuloy sa sangandaan na may pag-iingat.",
  },
  {
    id: 2,
    question: "Mandatory na dalhin ng mga driver ng kotse, anong uri ng seguro (insurance)?",
    options: ["Komprehensibo", "Third-party", "Lahat ng nabanggit"],
    correctAnswer: 1, // Option B is correct
    explanation: "Ang Third-party insurance ay mandatory na dalhin ng lahat ng mga driver ng kotse sa Pilipinas.",
  },
  {
    id: 3,
    question: "Kapag pumaparada sa paahon na daan na walang bangketa, iliko ang iyong gulong:",
    options: ["kahanay / kahilera ng kalsada", "patungo sa gilid ng kalsada", "patungo sa gitna ng kalsada"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Kapag pumaparada sa paahon na daan na walang bangketa, dapat iliko ang gulong patungo sa gilid ng kalsada para sa kaligtasan.",
  },
  {
    id: 4,
    question: "Alin sa mga sumusunod ang paglabag sa senyas pantrapiko o traffic signals?",
    options: ["Ilegal na pagparada", "Pagsakay o pagbaba", "Beating the red light"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang 'Beating the red light' ay paglabag sa traffic signals at napakadelikadong ginagawa na maaaring magdulot ng aksidente.",
  },
  {
    id: 5,
    question: "Ang sasakyan mo ay may hand-held telepono. Para magamit ito, ano ang iyong dapat gawin?",
    options: ["Gamitin habang nagpapatakbo ng maingat", "Bagalan ang iyong takbo", "Huminto muna saka ito gamitin"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Para sa kaligtasan, dapat huminto muna ang sasakyan bago gamitin ang hand-held telepono. Bawal gamitin ito habang nagmamaneho.",
  },
  {
    id: 6,
    question: 'Aling senyas trapiko ang nangangahulugang "Bawal Pumasok"?',
    options: [
      "Asul na bilog na may pulang diagonal na linya (No Entry sign)",
      "Pulang bilog na may puting horizontal na bar (Do Not Enter sign)",
      "Asul na bilog na may pulang X (No Stopping sign)",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang pulang bilog na may puting horizontal na bar ay ang standard na 'Bawal Pumasok' o 'Do Not Enter' sign sa traffic regulations.",
  },
  {
    id: 7,
    question: "Ang mga traffic sign, traffic signal, mga babala, at pavement marking ay para sa:",
    options: ["motorist lamang", "mga taong dumadaan lamang", "lahat ng gumagamit ng kalsada"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang mga traffic sign, traffic signal, mga babala, at pavement marking ay para sa lahat ng gumagamit ng kalsada - motorist, pedestrian, at iba pa.",
  },
  {
    id: 8,
    question: "Kailan pwedeng gamitin ang unang lane (pinakakaliwa) ng three-lane expressway?",
    options: [
      "Kapag mabagal ang takbo kaysa sa itinakdang bilis at walang ibang sasakyan sa paligid",
      "Kapag tumatakbo ng higit sa mabilis kaysa itinakdang bilis",
      "Kapag nag-o-overtake",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang pinakakaliwa na lane sa three-lane expressway ay ginagamit lamang para sa pag-overtake o pagdaan sa mas mabagal na sasakyan.",
  },
  {
    id: 9,
    question:
      "Ano ang dapat mong gawin kung sinadyang tinawid ng kasalubong na sasakyan ang gitnang daanan o lane upang lumusot o mag-overtake sa isa pang sasakyan?",
    options: [
      "Maging alerto at bagalan ang takbo o huminto kung kinakailangan",
      "Bumusina at pagbilihin ang bilis ng pagtakbo",
      "Pailawin ang head light",
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Kapag may kasalubong na sasakyan na tumatawid sa inyong lane, dapat maging alerto at magbagal o huminto para sa kaligtasan.",
  },
  {
    id: 10,
    question: "Nasa expressway ka at mayroong pulang kumikislap na ilaw sa taas ng bawat linya. Dapat kang:",
    options: ["magmaneho ng dahan-dahan", "umalis sa susunod na labasan", "huminto at maghintay"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang pulang kumikislap na ilaw sa expressway ay nangangahulugang dapat huminto at maghintay hanggang sa maging safe na magpatuloy.",
  },
  {
    id: 11,
    question: 'Ang traffic sign na "Give Way" ay nangangahulugan na:',
    options: [
      "bagalan ang takbo at humanda sa paghinto at magbigay daan sa mga may karapatan sa daan na sasakyan at mga taong tatawid",
      "bagalan ang takbo kung kinakailangan",
      "tuluyang huminto",
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Ang 'Give Way' sign ay nangangahulugang dapat magbagal at magbigay daan sa mga may karapatan sa daan.",
  },
  {
    id: 12,
    question:
      "Tama ba na itutulag ng gravity ang iyong sasakyan nang pataas kapag nagmamaneho sa paakyat na daan sa bilis na 60 km/oras?",
    options: ["Mali", "Tama", "Kailangang bilisan pa"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Mali - ang gravity ay hindi makakatulong sa pag-akyat ng sasakyan. Sa paakyat na daan, kailangan ng mas malakas na power para makaakyat.",
  },
  {
    id: 13,
    question: "Alin ang maaaring makapagpawala sa iyong konsentrasyon habang nagmamaneho?",
    options: [
      "Gamit ang panlinis ng iyong windscreen",
      "Pagtingin sa mga mapa ng daan, makinig sa malakas na kanta, pag-gamit ng mobile phone",
      "Pagtingin sa iyong side mirror",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang pagtingin sa mga mapa, pakikinig sa malakas na musika, at paggamit ng mobile phone ay mga pangunahing sanhi ng pagkawala ng konsentrasyon habang nagmamaneho.",
  },
  {
    id: 14,
    question: "Ano ang ibig sabihin ng senyas trapiko na ito?",
    options: ["Pook tawiran sa unahan", "Pook paaralan", "Bawal tumawid"],
    correctAnswer: 1, // Option B is correct - Pook paaralan
    explanation:
      "Ang yellow/green na bilog na may dalawang taong naglalakad (adult at bata) ay nagpapahiwatig ng pook paaralan o school zone.",
    image: "https://res.cloudinary.com/dlax3esau/image/upload/v1751104158/Screenshot_4_qjuxac.png",
  },
  {
    id: 15,
    question:
      "Magpapatuloy ka ba sa mabilis mong takbo kung sa likuran mo ay may sasakyang pang-emergency na sumisirena at kumikislap ang ilaw kahit na may isa pang bukas na lane?",
    options: ["Oo, para hindi ka maabala", "Hindi, dapat magmaneho nang mabagal", "Depende sa abilidad ng driver"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Kapag may emergency vehicle na may sirena at kumikislap na ilaw, dapat magbagal o magbigay daan kahit may ibang lane pa, para sa kaligtasan.",
  },
  {
    id: 16,
    question:
      "Kung may nakita kang bola mula sa likuran ng isang nakaparadang sasakyan sa isang kalye, malamang na may batang nakasunod dito. Ano ang gagawin mo?",
    options: ["Bilisan ang takbo", "Bagalan ang takbo", "Bumusina at panatilihin ang bilis ng takbo"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Kapag nakakita ng bola mula sa likuran ng nakaparadang sasakyan, dapat magbagal dahil maaaring may batang tumatakbo para kunin ito.",
  },
  {
    id: 17,
    question:
      "Ano ang mga code ng DL o Restriction para sa lisensya sa pag-mamaneho ng hindi-propesyonal ng maliit na sasakyan?",
    options: ["1, 3 (A, A1, D)", "1, 2, 4, 6 (A, A1, B, B1, B2, BE)", "1, 5 (A, A1, CE)"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Para sa hindi-propesyonal na maliit na sasakyan, ang mga code ay 1, 2, 4, 6 na tumutugma sa A, A1, B, B1, B2, at BE restrictions.",
  },
  {
    id: 18,
    question: "Kapag papalapit sa pataas na tulay, dapat kang?",
    options: ["Magdahan-dahan", "Biglang prumeno", "Magmabilis"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Kapag papalapit sa pataas na tulay, dapat magdahan-dahan para sa kaligtasan at para makontrol ang sasakyan sa pag-akyat.",
  },
  {
    id: 19,
    question:
      "Sa aling lugar ka hindi dapat mag-overtake nang walang malinaw na nakikita kahit man lamang sa 200 talampakan sa unahan?",
    options: ["Bago ang kurbada", "Sa loob ng koneksyon sa kalsada", "Bago ang rotonda"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Hindi dapat mag-overtake bago ang kurbada dahil hindi makikita ang mga paparating na sasakyan sa kabilang direksyon.",
  },
  {
    id: 20,
    question: "Ano ang mga epekto ng alak / droga?",
    options: [
      "Mas mabilis na reaksyon",
      "Walang gaanong control, kawalan ng kumpiyansa, at hindi pagsaalang-alang sa bilis ng pagmamaneho",
      "Higit na kamalayan sa panganib",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang alak at droga ay nagiging sanhi ng walang gaanong control, kawalan ng kumpiyansa, at hindi pagsaalang-alang sa bilis ng pagmamaneho - lahat ng ito ay delikado sa pagmamaneho.",
  },
  {
    id: 21,
    question: "Ang pinakamabisang gawin sa isang sasakyang tumutulok ay:",
    options: [
      "huwag siyang pansinin ngunit huwag siyang hayaang makalayo",
      "bagalan ang takbo at hayaan siyang lumampas",
      "bilisan at maging alisto sa pagpreno",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Kapag may sasakyang tumutulok sa harapan, dapat bagalan ang takbo at hayaan siyang lumampas para sa kaligtasan ng lahat.",
  },
  {
    id: 22,
    question:
      "Habang lumilipat ng lane, kailangan mong sumenyas, suriin/tingnan ang iyong rear view at side mirror, at:",
    options: ["pailawin ang head light ng sasakyan", "tingnan ang paparating na mga sasakyan", "bumusina"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Sa paglipat ng lane, bukod sa pagsesignal at pagtingin sa mirrors, kailangan ding tingnan ang paparating na mga sasakyan para sa kumpletong kaligtasan.",
  },
  {
    id: 23,
    question: "Ang Speedometer ay para sa bilis, samantalang ang Odometer ay para sa:",
    options: ["rebolusyon kada minuto", "layo ng nilakbay", "temperature"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang Speedometer ay nagsusukat ng bilis ng sasakyan, habang ang Odometer ay nagsusukat ng kabuuang layo na nilakbay ng sasakyan.",
  },
  {
    id: 24,
    question: "Ano ang ibig sabihin ng mga senyas trapiko na ito?",
    options: ["Daanan / riles ng tren", "May shrine sa unahan", "Bawal tumawid"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Ang mga triangular signs na may railway tracks at cross symbols ay nagpapahiwatig ng railway crossing o daanan ng tren. Dapat maging maingat sa mga lugar na ito.",
    images: [
      "https://res.cloudinary.com/dlax3esau/image/upload/v1751106099/Screenshot_6_nifreh.png",
      "https://res.cloudinary.com/dlax3esau/image/upload/v1751106099/Screenshot_5_zveqgz.png",
    ],
  },
  {
    id: 25,
    question: "Alin sa mga sumusunod na sasakyan ang maaaring gumamit ng kumikislap na asul na ilaw?",
    options: ["Expressway maintenance", "Sasakyan na bomb disposal", "Patrol ng pulisya"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang kumikislap na asul na ilaw ay ginagamit lamang ng mga patrol ng pulisya at iba pang law enforcement vehicles para sa emergency situations.",
  },
  {
    id: 26,
    question:
      "Ano ang gagawin mo kapag nagreseta ang iyong doctor ng gamot na maaaring nakaapekto sa iyong pagmamaneho?",
    options: ["Iwasang magmaneho sa mga expressway", "Magmaneho lamang kung ikaw ay may kasama", "Huwag magmaneho"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Kapag may ininom na gamot na maaaring makaapekto sa inyong kakayahan sa pagmamaneho, dapat huwag magmaneho para sa kaligtasan ng lahat.",
  },
  {
    id: 27,
    question: "Bago lumiko, kailangan mo bang paraanin ang mga taong naglalakad?",
    options: [
      "Oo, dapat paraanin ng driver ang mga taong naglalakad",
      "Oo, kung ito ay liliko pakanan lamang",
      "Oo, kung ito ay liliko pakaliwa lamang",
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Bago lumiko, dapat palaging paraanin ang mga pedestrian dahil sila ay may karapatan sa daan at para sa kanilang kaligtasan.",
  },
  {
    id: 28,
    question:
      "Sa automatic na clutch, gamitin ang kambyo na 'Park' kapag ipaparada ang iyong sasakyan na nakaharap sa palusong na daan. Anong kambyo ang dapat mong gamitin sa manual na clutch?",
    options: [
      "Iwanan ang sasakyan nang naka-neutral",
      "Iwanan ang sasakyan na nakakambyo sa primera",
      "Iwanan ang sasakyan na naka-reverse",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Sa manual transmission, kapag nakaharap sa palusong na daan, dapat iwanan ang sasakyan na naka-reverse gear para hindi ito gumulong pababa.",
  },
  {
    id: 29,
    question: "Ang mga driver na higit na mabagal sa iba ay dapat nasa:",
    options: ["daanan o lane sa gawing labas", "gitnang daanan o lane", "gawing loob o daanan o lane"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Ang mga mabagal na driver ay dapat nasa gawing labas o rightmost lane para hindi makaabala sa daloy ng trapiko.",
  },
  {
    id: 30,
    question: "Kapag nasa kalsada, kailan mo pwedeng iwanang nakabukas ang makina ng iyong sasakyan?",
    options: [
      "Kapag nasa 40 kph na lugar",
      "Kapag paparada na hindi lalagpas sa 5 minuto",
      "Hindi maaari kahit sa anumang sitwasyon",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Hindi dapat iwanang nakabukas ang makina ng sasakyan kahit sa anumang sitwasyon dahil ito ay nagdudulot ng polusyon at aksidente.",
  },
  {
    id: 31,
    question: "Babala ang signal na ito para sa panganib sa unahan:",
    options: ["umiindap na dilaw na ilaw", "umiindap na pulang ilaw", "umiindap na berdeng ilaw"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang umiindap na pulang ilaw ay nagbabala ng panganib sa unahan at dapat maging maingat ang mga driver.",
  },
  {
    id: 32,
    question: "Kapag ang motorista ay nag-flash ng kanilang head light sa iyo, ang ibig sabihin nito:",
    options: [
      "na sila ay nagbibigay daan sa iyo",
      "na may isang radar speed trap sa unahan",
      "na binabalaan ka nila ng kanilang presensya",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang pag-flash ng headlight ay karaniwang ginagamit para magbigay babala sa iba pang driver tungkol sa kanilang presensya.",
  },
  {
    id: 33,
    question:
      "Alin sa mga ito, kung pinapayagan na mababa, ay maaaring makapag-dulot ng aksidente o pag-crush sa kalsada?",
    options: ["Lebel ng radiator coolant", "Lebel ng radiator water", "Lebel ng likido ng preno"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang mababang lebel ng brake fluid ay napakadelikado dahil maaaring mawalan ng preno ang sasakyan at magdulot ng aksidente.",
  },
  {
    id: 34,
    question: "Aling senyas trapiko ang nagsasaad ng regulasyon at pagbabawal?",
    options: [
      {
        type: "image",
        src: "https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_9_dvxkkz.png",
        alt: "Rectangular white sign with black border",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_8_yupmeb.png",
        alt: "Red circular sign",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_7_ug3urq.png",
        alt: "Rectangular white sign with brown corner",
      },
    ],
    correctAnswer: 1, // Option B is correct - Red circle indicates prohibition/regulation
    explanation:
      "Ang pulang bilog na senyas trapiko ay nagpapahiwatig ng regulasyon at pagbabawal. Ito ang standard na hugis para sa mga prohibition signs sa buong mundo.",
  },
  {
    id: 35,
    question:
      "Alin sa mga sumusunod na pagkakataon ang maaari mong gawin kapag tumatawid sa isang solid na dilaw na linya?",
    options: ["Pagliko sa driveway kung ligtas itong gawin", "Pagdaan sa highway", "Pag-U-turn na highway"],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Ang solid yellow line ay maaaring tawirin lamang kapag liliko sa driveway o private property, basta ligtas itong gawin at walang paparating na sasakyan.",
  },
  {
    id: 36,
    question: "Paano mo linisin ang iyong accelerator, preno, at kable ng clutch?",
    options: [
      "Palaging hugasan ang kable ng sabon at tubig",
      "Palaging ibabad ang kable sa langis pang makina",
      "Palaging ibabad ang kable sa gasolina",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang mga kable ng accelerator, preno, at clutch ay dapat ibabad sa engine oil para sa tamang lubrication at para maiwasan ang rust.",
  },
  {
    id: 37,
    question:
      "Nakakita ka ng school bus na nakaparada sa kabilang bahagi ng highway na nakabukas ang hazard warning na ilaw. Kailangan mo bang huminto?",
    options: [
      "Oo, kailangan mong huminto. Ngunit pwede ka ng tumuloy kung sa tingin mo ay ligtas na",
      "Oo, kailangan mong huminto hanggang sa mamatay ang hazard light at walang mga bata sa kalsada",
      "Hindi, ngunit kailangan mong magdahan-dahan",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Sa highway na may divider, hindi kailangan huminto kapag ang school bus ay nasa kabilang side, pero dapat magdahan-dahan para sa kaligtasan.",
  },
  {
    id: 38,
    question: "Alin sa sumusunod na accessory ang ipinag-uutos na maipanatili sa magandang kondisyon?",
    options: ["Seat belt", "Head light", "Lahat ng nabanggit"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Lahat ng nabanggit na accessories - seat belt, head light, at iba pa - ay dapat panatilihing nasa magandang kondisyon para sa kaligtasan ng driver at passengers.",
  },
  {
    id: 39,
    question: "Paano ka dapat pumarada sa tabi ng sasakyan na may ganitong sticker?",
    options: [
      "Pumarada na nakasampa ang dalawang gulong sa bangketa",
      "Pumarada malapit sa kabilang gilid ng sasakyan",
      "Pumarada ngunit magbigay ng tamang puwang para sa wheelchair",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Kapag may nakitang sasakyan na may wheelchair accessibility sticker, dapat magbigay ng sapat na puwang para sa wheelchair access at hindi hadlangan ang kanilang paggamit ng accessibility features.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zv6jyn90BnTd5NKcTE8juaORz5jvKG.png",
  },
  {
    id: 40,
    question: "Sa malinaw na pananaw na hindi bababa sa 200 talampakan, aling lugar ang hindi mo dapat overtake-an?",
    options: ["Sa paanan ng tulay", "Sa sangandaan", "Lahat ng nabanggit"],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Kahit may malinaw na pananaw na 200 talampakan, hindi dapat mag-overtake sa paanan ng tulay, sangandaan, at iba pang delikadong lugar dahil maaaring may mga hindi nakikitang panganib.",
  },
  {
    id: 41,
    question: "Ilang metro ang lampas na haba sa sasakyan ng kargada para lagyan ito ng pulang bandera?",
    options: ["Mahigit 0.5 metro", "Mahigit 1.0 metro", "Mahigit 1.5 metro"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Kapag ang kargada ay lumalampas ng mahigit 1.0 metro sa haba ng sasakyan, kinakailangan itong markahan ng pulang bandera para sa kaligtasan ng ibang motorista.",
  },
  {
    id: 42,
    question: "Nagmamaneho ka sa mabagal na pila ng trapiko. Bago magpalit ng linya dapat kang:",
    options: [
      "tumingin ng mga motoristang nangunguna sa trapiko",
      "bumusina",
      "magbigay ng signal ng braso na 'magal'",
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Sa mabagal na trapiko, bago magpalit ng linya dapat tingnan muna ang mga motoristang nangunguna para masiguro na ligtas ang paglipat at hindi makakaabala sa daloy ng trapiko.",
  },
  {
    id: 43,
    question: "Alin sa mga sumusunod ang nakalarawan?",
    options: ["Baku-bakong kalsada", "Madulas ang kalsada", "Matarik ang kalsada"],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang triangular warning sign na may larawan ng sasakyang nag-skid ay nagpapahiwatig ng madulas na kalsada. Dapat maging maingat at magbagal ang mga driver sa ganitong kondisyon.",
    image: "https://res.cloudinary.com/dlax3esau/image/upload/v1751111101/Screenshot_10_w68jei.png",
  },
  {
    id: 44,
    question: "Sa gabi, kapag papalapit sa isang kurbada o interseksyon na mahirap makita ang kasalubong, tiyaking:",
    options: [
      "patay ang head light upang makita ng mga kasalubong na sasakyan ang sasakyan mo",
      "pailawin ang head light upang malaman ng mga tao at mga makakasalubong na motorista na papalapit ka sa kurbada o interseksyon",
      "pailawin ang mga ilaw sa loob ng sasakyan upang makita ng mga makakasalubong ang iyong sasakyan",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Sa gabi, kapag papalapit sa kurbada o interseksyon na mahirap makita ang kasalubong, dapat pailawin ang headlight para magbigay babala sa mga tao at motorista na may paparating na sasakyan.",
  },
  {
    id: 45,
    question: "Kapag nakakita ka ng nakahintong sasakyan sa gilid ng kalsada, ano ang gagawin mo?",
    options: [
      "Bumusina ng malaman nila na ikaw ay dadaan",
      "Huminto at pagalitan ang driver",
      "Bagalan ang takbo at mag-ingat sa pagdaan",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Kapag may nakahintong sasakyan sa gilid ng kalsada, dapat magbagal at mag-ingat sa pagdaan dahil maaaring may mga taong bumababa o sumasakay, o may emergency situation.",
  },
  {
    id: 46,
    question: "Nagmaneho ka hanggang sa isang interseksyon at nakita mo ang senyas na ito. Ano ang dapat mong gawin?",
    options: [
      "Mapanatili ang bilis dahil ang lahat ng trapiko sa unahan ay dapat magbigay sa iyo",
      "Dumating sa isang kumpletong paghinto at magpatuloy pagkatapos ng pagbibigay sa anumang mga naglalakad at trapiko",
      "Pabagalin at maghanda na magbigay sa anumang mga naglalakad at trapiko sa unahan",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang red triangular 'Give Way' o 'Yield' sign ay nangangahulugang dapat magbagal at maghanda na magbigay daan sa mga pedestrian at iba pang sasakyan. Hindi kailangan ng kumpletong paghinto maliban kung kinakailangan para sa kaligtasan.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_11-cXZGJYppnvNzlDB6kluA6ZIkP1ofwt.png",
  },
  {
    id: 47,
    question: "Ang dalawahang highway na iyong pupuntahan ay makitid na daan. Dapat kang:",
    options: [
      "dumiretso agad at huwag alalahanin ang tungkol sa karapatan sa daan",
      "maghintay ng iba pang mga sasakyan at sundan ang mga ito",
      "maghintay hanggang sa wala nang sasakyan sa magkabilang direksyon",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Kapag papasok sa makitid na daan mula sa dalawahang highway, dapat maghintay hanggang sa wala nang sasakyan mula sa magkabilang direksyon upang maiwasan ang aksidente at matiyak ang kaligtasan ng lahat.",
  },
  {
    id: 48,
    question: "Aling senyas trapiko ang nangangahulugang 'Two-Way'?",
    options: [
      {
        type: "image",
        src: "/images/48-a.png",
        alt: "Rectangular white sign with black border",
      },
      {
        type: "image",
        src: "/images/48-b.png",
        alt: "Red circular sign",
      },
      {
        type: "image",
        src: "/images/48-c.png",
        alt: "Rectangular white sign with brown corner",
      },
    ],
    correctAnswer: 1, // Option B is correct - Red circle indicates prohibition/regulation
    explanation:
      "",
  },
  {
    id: 49,
    question: "Ang pag-inom ng kahit na gaano karaming alak ay maaaring:",
    options: [
      "makapagpabilis ng iyong reaksyon, makapagpapagaling ng koordinasyon ng iyong katawan, at makapagpahinga ng iyong isip",
      "makapagpabuti ng iyong kaalaman tungkol sa panganib at tungkol sa mga batas at regulasyong pantrapik",
      "makapagpabagal ng iyong reaksyon, makapagpahina ng iyong paghusga, at makapagbibigay ng hindi tunay na kumpiyansa sa sarili",
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      "Ang pag-inom ng alak ay nagpapabagal ng reaksyon, nagpapahina ng paghusga, at nagbibigay ng maling kumpiyansa sa sarili, kaya't delikado ito sa pagmamaneho.",
  },
  {
    id: 50,
    question: "Kapag lumiko sa isang sangandaan, kailangan mo bang magbigay daan sa mga taong naglalakad?",
    options: [
      "Oo, ang driver na liliko sa kaliwa o kanan ay dapat magbigay daan sa taong naglalakad",
      "Oo, kapag paliko lamang sa kanan",
      "Oo, kapag paliko lamang sa kaliwa",
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      "Ang driver na liliko sa kaliwa o kanan ay palaging dapat magbigay daan sa mga pedestrian para sa kanilang kaligtasan.",
  },
  {
    id: 51,
    question: "Ang isang solong buong dilaw na ilaw ay nangangahulugang:",
    options: [
      "pinahihintulutan ang pagdaan / pag-overtake",
      "pagdaan / pag-o-overtake ay hindi pwede",
      "pagdaan / pag-o-overtake ay maaaring gawin kahit kailan",
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      "Ang isang solong buong dilaw na ilaw ay nangangahulugang hindi pinapayagan ang pagdaan o pag-overtake para sa kaligtasan.",
  },
  {
    id: 52,
    question: "Lumapit ka sa isang kantong hindi gumagana ang mga ilaw ng trapiko, isang traffic enforcer ang nagbigay ng signal na ito. Dapat mong:",
    image: "/images/52.png",
    options: [
      "huminto sa linya ng paghinto",
      "iiwan lang",
      "itigil ang antas sa braso ng nakakasakit",
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      "Kapag ang traffic enforcer ay nagbigay ng signal na huminto, dapat kang huminto sa linya ng paghinto para sumunod sa batas trapiko.",
  },
  {
    id: 53,
    question: "Ito ay traffic sign na octagonal ang hugis:",
    options: [
      "paradahan",
      "lugar ng sakayan at babaan",
      "babala ng pagtigil",
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      "Ang octagonal na traffic sign ay nangangahulugang 'STOP' o babala ng pagtigil.",
  },
  {
    id: 54,
    question: "Ano ang ibig sabihin ng senyas trapiko na ito?",
    image: "/images/54.png",
    options: [
      "Paisa-isang sasakyan lamang ang maaaring dumaan",
      "Bawal pumasok lahat ng klase ng sasakyan",
      "Dumiretso sa unahan at lumiko sa interseksyon",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang senyas na ito ay nangangahulugang 'No Entry' o bawal pumasok ang lahat ng klase ng sasakyan.",
  },
  {
    id: 55,
    question: "Ayon sa R.A. 4136, alin sa mga sumusunod ang maksimum na nararapat na bilis sa mga malawak na pambansang kalsada?",
    options: [
      "80 km/oras",
      "100 km/oras",
      "60 km/oras",
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      "Ayon sa R.A. 4136, ang maksimum na bilis sa malawak na pambansang kalsada ay 80 km/oras.",
  },
  {
    id: 56,
    question: "Sino ang pangunahing may karapatan sa daan?",
    options: [
      "Truck ng bumbero na may ilaw at sirena na papunta sa emergency",
      "Malalaking bus",
      "Articulated truck",
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      "Ang mga emergency vehicles tulad ng truck ng bumbero na may ilaw at sirena ay may pangunahing karapatan sa daan.",
  },
  {
    id: 57,
    question: "Ano ang kailangan mong gawin kung masundan mo ang truck na may ganitong kumukurap-kurap na senyas sa kaniyang likuran?",
    image: "/images/57.png",
    options: [
      "Magmaneho papalayo sa truck",
      "Dumaan sa kanang linya",
      "Dumaan sa kaliwang linya",
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      "Kapag nakita mo ang senyas na ito sa likod ng truck, dapat kang dumaan sa kaliwang linya.",
  },
  {
    id: 58,
    question: "Ang Premium na gasolina ay nagbibigay ng higit na kakayahan ngunit maaaring magresulta sa:",
    options: [
      "sobrang pagkonsumo ng langis",
      "labis na pag-init",
      "dumudulas na clutch",
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      "Ang paggamit ng premium na gasolina na hindi angkop ay maaaring magdulot ng labis na pag-init ng makina.",
  },
  {
    id: 59,
    question: "Sa ilalim ng batas, ano ang iba pang sanhi na maaaring makaapekto sa iyong kalagayan sa pagmamaneho maliban sa mga inuming nakalalasing?",
    options: [
      "Kumakain habang nagmamaneho",
      "Mapanganib na ilegal na droga",
      "Pakikinig sa malakas na musika",
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      "Ang paggamit ng mapanganib na ilegal na droga ay maaaring makaapekto sa iyong kakayahan sa pagmamaneho at labag sa batas.",
  },
  {
    id: 60,
    question: "Ano ang maipapayo mo sa driver na nakainom nang konti sa party?",
    options: [
      "Uminom ng matapang na kape at pagkatapos magmaneho pauwi",
      "Magpahinga at huwag magmaneho",
      "Magmaneho nang mabagal at maingat pauwi",
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang tamang payo sa driver na nakainom ay magpahinga at huwag magmaneho upang maiwasan ang aksidente at mapanatili ang kaligtasan.",
  },
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const checkAnswer = () => {
    if (selectedAnswer === null) return

    setShowResult(true)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestion])
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizCompleted(false)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16 text-yellow-500" />
                ) : (
                  <BookOpen className="w-16 h-16 text-blue-500" />
                )}
              </div>
              <CardTitle className="text-2xl">{passed ? "Congratulations!" : "Keep Studying!"}</CardTitle>
              <CardDescription>
                You scored {score} out of {questions.length} questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-primary">{percentage}%</div>
              <Badge variant={passed ? "default" : "secondary"} className="text-sm">
                {passed ? "PASSED" : "NEEDS IMPROVEMENT"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {passed
                  ? "Great job! You're ready for the LTO exam."
                  : "Review the materials and try again. You need 70% to pass."}
              </p>
              <Button onClick={resetQuiz} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Quiz Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">LTO Reviewer</h1>
          <p className="text-sm text-gray-600">Test your driving knowledge</p>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>
                  Score: {score}/{answeredQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg leading-tight">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Display images if question has them */}
            {questions[currentQuestion].image && (
              <div className="flex justify-center mb-4">
                <Image
                  src={questions[currentQuestion].image || "/placeholder.svg"}
                  alt="Traffic Sign"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain border-2 border-gray-200 rounded-lg"
                />
              </div>
            )}

            {/* Display multiple images if question has them */}
            {questions[currentQuestion].images && (
              <div className="flex justify-center gap-4 mb-4 flex-wrap">
                {questions[currentQuestion].images.map((imgSrc, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={imgSrc || "/placeholder.svg"}
                    alt={`Traffic Sign ${imgIndex + 1}`}
                    width={80}
                    height={80}
                    className="w-24 h-24 object-contain border-2 border-gray-200 rounded-lg"
                  />
                ))}
              </div>
            )}

            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "w-full justify-start text-left h-auto p-4 whitespace-normal border-2"
              let icon = null

              if (showResult) {
                if (index === questions[currentQuestion].correctAnswer) {
                  buttonClass += " bg-green-200 border-green-300 text-green-900 hover:bg-green-200"
                  icon = <CheckCircle className="w-4 h-4 text-green-600" />
                } else if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
                  buttonClass += " bg-red-100 border-red-300 text-red-900 hover:bg-red-100"
                  icon = <XCircle className="w-4 h-4 text-red-600" />
                } else {
                  buttonClass += " bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-50"
                }
              } else if (selectedAnswer === index) {
                buttonClass += " bg-blue-100 border-blue-300 text-blue-900"
              } else {
                buttonClass += " bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="font-bold text-sm bg-gray-800 text-white rounded w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      [{String.fromCharCode(65 + index)}]
                    </span>
                    <div className="flex-1 text-left">
                      {typeof option === "string" ? (
                        <span>{option}</span>
                      ) : option.type === "image" ? (
                        <div>
                          <Image
                            src={option.src || "/placeholder.svg"}
                            alt={option.alt}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-contain mx-auto"
                          />
                          <span style={{ display: "none" }} className="text-red-500 text-sm">
                            Image not available
                          </span>
                        </div>
                      ) : (
                        typeof option === "string" ? <span>{option}</span> : null
                      )}
                    </div>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Explanation Card */}
        {showResult && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-900">Explanation:</h4>
                <p className="text-sm text-blue-800">{questions[currentQuestion].explanation}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!showResult ? (
            <Button onClick={checkAnswer} disabled={selectedAnswer === null} className="w-full" size="lg">
              Check Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="w-full" size="lg">
              {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
            </Button>
          )}

          <Button variant="outline" onClick={resetQuiz} className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
