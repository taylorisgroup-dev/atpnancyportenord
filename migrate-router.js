const fs = require('fs');
const path = require('path');

function walkDir(dir, cb) {
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walkDir(p, cb);
        } else {
            cb(p);
        }
    });
}

walkDir('./src', (f) => {
    if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        let orig = fs.readFileSync(f, 'utf-8');
        let c = orig;

        if (f.endsWith('.tsx') && !c.includes('use client') && !f.replace(/\\/g, '/').includes('app/layout.tsx') && !f.replace(/\\/g, '/').includes('app/page.tsx')) {
            c = '"use client";\n' + c;
        }

        c = c.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?/g, (m, p1) => {
            let i = p1.split(',').map(x => x.trim());
            let nI = [];
            let nN = [];
            let r = '';

            if (i.includes('Link')) { nI.push('Link'); i = i.filter(x => x !== 'Link'); }
            if (i.includes('useLocation')) { nN.push('usePathname'); c = c.replace(/useLocation\(\)/g, "({ pathname: usePathname() })"); i = i.filter(x => x !== 'useLocation'); }
            if (i.includes('useNavigate')) { nN.push('useRouter'); c = c.replace(/useNavigate\(\)/g, "useRouter()"); i = i.filter(x => x !== 'useNavigate'); }
            if (i.includes('useParams')) { nN.push('useParams'); i = i.filter(x => x !== 'useParams'); }

            if (nI.length > 0) r += "import Link from 'next/link';\n";
            if (nN.length > 0) r += `import { ${nN.join(', ')} } from 'next/navigation';\n`;
            if (i.length > 0) r += `// import { ${i.join(', ')} } from 'react-router-dom';\n`;
            return r;
        });

        c = c.replace(/<Link([^>]+)to=/g, '<Link$1href=');
        c = c.replace(/<Navigate([^>]+)to=/g, '<meta http-equiv="refresh" content="0; url=');

        if (c !== orig) {
            fs.writeFileSync(f, c, 'utf-8');
            console.log('Updated', f);
        }
    }
});
