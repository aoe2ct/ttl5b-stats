---
title: T90 Titans League 5 Bronze in Stats
---

import Chart from '../components/charts/chart.tsx'
import Base from '../components/charts/base.tsx'
import FilterDialog from '../components/filter/filter-dialog.tsx'
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{ display: "flex", justifyContent: 'center', marginBottom: '2em', marginTop: '-4em' }}>
    <img alt="T90 Titans League 5 Bronze" src={useBaseUrl("/img/brackets/Bronze.webp")} width="350" height="385"/>
</div>
# T90 Titans League 5 Bronze in Stats

<!--
This is a very quick fix to get the build on server to work. This likely kills indexing of the page, so if I care in the future, then fix this properly
-->
<BrowserOnly>{() => <Base/>}</BrowserOnly>

<FilterDialog/>
